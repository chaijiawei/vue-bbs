import _ from 'lodash'

export default {
    data() {
        return {
            perPage: 10,
            currentPage: 1,
            pageSourceData: [],
        }
    },
    computed: {
        rows() {
            return this.pageSourceData.length
        },
        pageData() {
            let start = (this.currentPage - 1) * this.perPage
            let end = start + this.perPage
            return _.slice(this.pageSourceData, start, end)
        }
    },
    methods: {
        setPageSource(data) {
            this.pageSourceData = data
        }
    }
}
