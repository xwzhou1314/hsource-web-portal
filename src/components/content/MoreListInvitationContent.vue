<template>
  <div class="article-list-content">
    <iv-row>
      <iv-col  offset="4" :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-right">
          <article-list-header v-if="categoryList.length>0" @filterByMenu="filterByMenu"
                               @filterByCategory="filterByCategory"
                               :categorys="categoryList"
                               :defaultCategory="selected_category"
                               :mainTitle="'123'" :sub-title="'Articles'" ></article-list-header>
          <article-list-cell v-for="article in articleList" :article="article" :key="article.id"></article-list-cell>
          <!--<browse-more @browseMore="browseMore" :noMoreData="noMoreData"  ref="browseMore"></browse-more>-->
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="4">

      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
import ArticleListHeader from '@/components/views/Article/ArticleListHeader'
import ArticlePageContent from '@/components/views/Article/ArticlePageContent'
import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter'
import ArticleListCell from '@/components/views/Article/ArticleListCell'
import Recommend from '@/components/views/Recommend'
import TagWall from '@/components/views/TagWall'
import BrowseMore from '@/components/views/BrowseMore'
import merge from 'lodash/merge'
import {DefaultLimitSize} from '@/common/js/const'

export default {
  data () {
    return {
      articleList: [],
      categoryList: [],
      selected_category: this.$route.params.id,
      currentPage: 1,
      pageSize: DefaultLimitSize,
      categoryId: this.$route.params.id,
      menuParams: {
        latest: true
      },
      selectParams: {
        title: ''
      },
      noMoreData: false
    }
  },
  created () {
    this.listArticle()
    this.listCategory()
  },
  methods: {
    listArticle () {
      let params = {
        categoryId: this.categoryId,
        limit: this.pageSize,
        page: this.currentPage
      }
      params = merge(params, this.menuParams)
      this.$http({
        url: this.$http.adornUrl('/articles'),
        params: this.$http.adornParams(params),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 200) {
          if (data.page.totalPage <= data.page.currPage) {
            this.noMoreData = true
          } else {
            this.noMoreData = false
          }
          this.articleList = data.page.list
        }
      })
    },
    listCategory () {
      this.$http({
        url: this.$http.adornUrl('api/item/invitation/selectList'),
        data: this.$http.adornData(this.selectParams, false),
        method: 'post'
      }).then((resp) => {
        this.articleList = resp.data
        console.log(this.articleList)
        console.log(resp)
      })
    },
    filterByMenu (params) {
      this.resetCurrentPage()
      this.menuParams = params
      this.listArticle()
    },
    filterByCategory (params) {
      this.resetCurrentPage()
      this.categoryId = params
      this.listArticle()
    },
    resetCurrentPage () {
      this.currentPage = 1
    },
    browseMore () {
      this.currentPage++
      let params = {
        categoryId: this.categoryId,
        limit: this.pageSize,
        page: this.currentPage
      }
      params = merge(params, this.menuParams)
      this.$http({
        url: this.$http.adornUrl('/articles'),
        params: this.$http.adornParams(params),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 200) {
          if (data.page.totalPage <= data.page.currPage) {
            this.noMoreData = true
          } else {
            this.noMoreData = false
          }
          this.articleList = this.articleList.concat(data.page.list)
        }
      }).then(response => {
        this.$refs.browseMore.stopLoading()
      }).catch(error => {
        this.$refs.browseMore.stopLoading()
        console.log(error)
      })
    }
  },
  components: {
    'article-list-header': ArticleListHeader,
    'article-page-content': ArticlePageContent,
    'article-page-footer': ArticlePageFooter,
    'article-list-cell': ArticleListCell,
    'recommend': Recommend,
    'tag-wall': TagWall,
    'browse-more': BrowseMore
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .article-list-content
    width auto
    @media only screen and (max-width: 768px)
      margin 5px 5px 10px 5px
    @media screen and (min-width: 768px)
      margin 10px 10px 20px 10px
    @media screen and (min-width: 992px)
      margin 15px 35px 50px 35px
    @media screen and (min-width: 1200px)
      width 1200px
      margin 15px auto 0
      margin-bottom 50px
    .layout-left, .layout-right
      padding 0
      @media only screen and (max-width: 768px)
        padding 0
      @media screen and (min-width: 768px)
        padding 0
      @media screen and (min-width: 992px)
        padding 0 10px
      @media screen and (min-width: 1200px)
        padding 0 10px
</style>
