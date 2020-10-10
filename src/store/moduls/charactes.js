const charactersModule = {
  namespaced: true,

  state: () => ({
    characters: [],
    likeCharacters: []
  }),

  mutations: {
    SET_CHARACTERS(state, characters) {
      state.characters = characters;
    },
   
 
    SET_LIKE_SELECT_CHARACTERS(state, character) {
      const index = character.index;
      console.log(index)
      if (character.like) {
        state.characters[index].like = false

        const indexLike = state.likeCharacters.findIndex((item) => item.id === character.id)
        console.log(indexLike)
        state.likeCharacters.splice(indexLike, 1)
        
      } else {
        state.characters[index].like = true
        state.likeCharacters.push(character)
        
        
      }  
      
      
    },
    
  },
  getters: {
    listsLikesCharacters(state) {
      return state.likeCharacters
    },
    
    
  },

};

export default charactersModule;
