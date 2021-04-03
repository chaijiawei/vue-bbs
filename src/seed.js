import articleData from '@/mock/article'
import ls from "@/utils/localStorage"

//清除article
ls.removeItem('articles')

//设置文章数据
let articles = articleData(50)
ls.setItem('articles', articles)


