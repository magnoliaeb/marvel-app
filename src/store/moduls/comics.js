const comicsModule = {
  namespaced: true,

  state: () => ({
    comics: [],
    likeComics: []
  }),

  mutations: {
    SET_COMICS(state, comics) {
      state.comics = comics;
    },
   
 
    SET_LIKE_SELECT_COMICS(state, character) {
      const index = character.index;
      console.log(index)
      if (character.like) {
        state.comics[index].like = false

        const indexLike = state.likeComics.findIndex((item) => item.id === character.id)
        console.log(indexLike)
        state.likeComics.splice(indexLike, 1)
        
      } else {
        state.comics[index].like = true
        state.likeComics.push(character)
        
        
      }  
      
      
    },
    
  },
  getters: {
    listsLikesComics(state) {
      return state.likeComics
    },
    
    
  },

};

export default comicsModule;
