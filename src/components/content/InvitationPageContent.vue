<template>
  <div class="article-content" v-cloak>
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <article-page-header :article="article"></article-page-header>
          <article-page-content>
            <article id="article-main-page" class="typo container" slot="content" ref="article"
                     v-html="article.contentFormat">
            </article>
          </article-page-content>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>
<script type="text/ecmascript-6">
import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader'
import ArticlePageContent from '@/components/views/Article/ArticlePageContent'
export default {
  data () {
    return {
      article: {}
    }
  },
  components: {
    'article-page-header': ArticlePageHeader,
    'article-page-content': ArticlePageContent
  },
  created: function () {
    this.getArticle(this.$route.params.articleId)
  },
  methods: {
    getArticle (articleId) {
      this.$http({
        url: this.$http.adornUrl('/article/' + articleId),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.article = data.article
        }
      })
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .article-content
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
