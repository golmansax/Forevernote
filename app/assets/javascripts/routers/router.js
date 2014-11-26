Evernote.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = $(options.rootEl);
  },

  routes: {
    "": "notebooksIndex",
    "notebooks/:id": "notebooksShow"
  },

  //I don't think I actually want this
  notebooksShow: function(id) {
    var notebook = Evernote.Collections.notebooks.getOrFetch(id);
    var showView = new Evernote.Views.NotebooksShow({
      model: notebook
    });
    this._swapView(showView);
  },

  notebooksIndex: function() {
    var notebooks = Evernote.Collections.notebooks;
    notebooks.fetch();
    var indexView = new Evernote.Views.NotebooksIndex({
      collection: notebooks
    });

    this._swapView(indexView);
  },

  _swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})