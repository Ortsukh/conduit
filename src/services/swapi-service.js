export default class SwapiService {
  _apiBase = "https://conduit.productionready.io/api/";
  _baseImageUrl = `https://starwars-visualguide.com/assets/img`;

  async sendSetting(
    idValue,
    emailValue,
    passwordValue,
    usernameValue,
    imgValue,
    bioValue,
    tokenValue
  ) {
    let a = {
      user: {
        id: idValue,
        email: emailValue,
        username: usernameValue,
        bio: bioValue,
        image: imgValue,
        token: tokenValue,
        password: passwordValue,
      },
    };

    const res = await fetch(`${this._apiBase}user`, {
      method: "put",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        accept: "application/json",
        Authorization: `Token ${tokenValue}`,
      },
      body: JSON.stringify(a),
    });
    return await res.json();
  }
  sendNewArticle = async (title, description, body, tags, token) => {
    let a = {
      article: {
        tagList: tags,
        title: title,
        description: description,
        body: body,
      },
    };
    const res = await fetch(`${this._apiBase}articles`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(a),
    });
    return await res.json();
  };
  async sendResource(emailValue, passwordValue, usernameValue) {
    let a = {
      user: {
        email: emailValue,
        password: passwordValue,
        username: usernameValue,
      },
    };
    const res = await fetch(`${this._apiBase}users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(a),
    });
    return await res.json();
  }
  async sendResource1(emailValue, passwordValue) {
    let a = {
      user: {
        email: emailValue,
        password: passwordValue,
      },
    };
    const res = await fetch(`${this._apiBase}users/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(a),
    });
    return await res.json();
  }
  async deleteArticle(articleId, token) {
    const res = await fetch(`${this._apiBase}articles/${articleId} `, {
      method: "delete",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    });
    return await res.json();
  }

  async getResourceArticl(id, token) {
    const str = `${this._apiBase}articles/${id}`;
    let res;
    if (token) {
      res = await fetch(str, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${token}`,
        },
      });
    } else {
      res = await fetch(str);
    }
    return await res.json();
  }

  async getResourceProfil(username, token) {
    const str = `${this._apiBase}profiles/${username}`;
    let res;
    if (token) {
      res = await fetch(str, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${token}`,
        },
      });
    } else {
      res = await fetch(str);
    }

    return await res.json();
  }
  async getYourArticle(token) {
    const res = await fetch(`${this._apiBase}articles/feed?limit=10&offset=0`, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    });
    return await res.json();
  }
  async getResource(id = 0, tagId, author, favorited, token) {
    let str = `${this._apiBase}articles?limit=10&offset=${id}`;
    if (tagId) {
      str += `&tag=${tagId}`;
    } else if (favorited) {
      str += `&favorited=${author}`;
    } else if (author) {
      str += `&author=${author}`;
    }
    let res;
    if (token) {
      res = await fetch(str, {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Token ${token}`,
        },
      });
    } else {
      res = await fetch(str);
    }

    return await res.json();
  }
  async getResourceTag() {
    const res = await fetch(` ${this._apiBase}tags`);
    return await res.json();
  }
  async sendDataFavorite(articleId, metod, token, path) {
    let str = `${this._apiBase}${path}/${articleId}`;
    if (path === "articles") {
      str += "/favorite";
    } else {
      str += "/follow";
    }
    const res = await fetch(str, {
      method: `${metod}`,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
    });
    return await res.json();
  }
  sendFavorite = async (articleId, metod, token, path) => {
    const res = await this.sendDataFavorite(articleId, metod, token, path);
    return res;
  };
  deleteItem = async (articleId, token) => {
    const res = await this.deleteArticle(articleId, token);
    return res;
  };
  getAllTags = async (id, tagId) => {
    const res = await this.getResourceTag(id, tagId);
    return res.tags;
  };
  getNewArtical = async (title, description, body, tags, token) => {
    const res = await this.sendNewArticle(
      title,
      description,
      body,
      tags,
      token
    );
    return this._transformArticles(res.article);
  };
  SignIn = async (email, password) => {
    const res = await this.sendResource1(email, password);

    if (res.user) {
      return this._transformLogin(res.user);
    } else {
      return res;
    }
  };
  SignUp = async (email, password, username) => {
    const res = await this.sendResource(email, password, username);
    if (res.user) {
      return this._transformLogin(res.user);
    } else {
      return this._transformLoginError(res.errors);
    }
  };
  getArticlesCount = async (id, tagId, author, favorited) => {
    const res = await this.getResource(id, tagId, author, favorited);
    return res.articlesCount;
  };
  getProfil = async (username, token) => {
    const res = await this.getResourceProfil(username, token);
    return this._transformLogin(res.profile);
  };
  getArticl = async (id, token) => {
    const res = await this.getResourceArticl(id, token);
    return this._transformArticles(res.article);
  };
  getProfilArtical = async (id, tagId, author, favorited) => {
    const res = await this.getResource(id, tagId, author, favorited);
    return res.articles.map(this._transformArticles);
  };
  SetSetting = async (
    idValue,
    emailValue,
    passwordValue,
    usernameValue,
    urlValue,
    bioValue,
    tokenValue
  ) => {
    const res = await this.sendSetting(
      idValue,
      emailValue,
      passwordValue,
      usernameValue,
      urlValue,
      bioValue,
      tokenValue
    );
    if (res.user) {
      return this._transformLogin(res.user);
    } else {
      return this._transformLoginError(res.errors);
    }
  };
  getAllArticles = async (id, tagId, author, favorited, yourPost, token) => {
    const res = await this.getResource(
      id,
      tagId,
      author,
      favorited,
      yourPost,
      token
    );
    return res.articles.map(this._transformArticles);
  };
  getYourPost = async (token) => {
    const res = await this.getYourArticle(token);
    return res.articles.map(this._transformArticles);
  };
  getAllArticlesTag = async (id, tagId) => {
    const res = await this.getResource(id, tagId);
    return res.articles.map(this._transformArticles);
  };
  _transformArticles = (articles) => {
    return {
      title: articles.title,
      description: articles.description,
      author: articles.author.username,
      authorImg: articles.author.image,
      createdAt: articles.createdAt,
      favoritesCount: articles.favoritesCount,
      tagList: articles.tagList,
      slug: articles.slug,
      favorited: articles.favorited,
    };
  };
  _transformLogin = (user) => {
    return {
      id: user.id,
      username: user.username,
      token: user.token,
      image: user.image,
      email: user.email,
      following: user.following,
    };
  };
  _transformLoginError = (error) => {
    return {
      email: error.email,
      usernameErrors: error.username,
      password: error.password,
    };
  };
}
