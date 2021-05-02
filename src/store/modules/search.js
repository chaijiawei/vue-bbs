
const state = () => ({
    searchVal: ''
})

const mutations = {
    updateSearchVal(state, searchVal) {
        state.searchVal = searchVal
    }
}

const actions = {

}

const getters = {
    searchVal: state => state.searchVal
}

export default {
    state,
    mutations,
    actions,
    getters,
}
