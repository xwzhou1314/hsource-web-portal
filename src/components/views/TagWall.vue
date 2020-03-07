<template>
  <div class="tag-wall">
    <panel :title="'精选语录'">
      <div slot="content" class="content">
        <!--<iv-tag v-for="(tag , index) in tagList" type="dot" color="blue" :key="index" style="margin: 0 5px 5px 0;" class="dot-tag">{{ tag.name +' ['+ tag.linkNum + ']'}}-->
        <!--</iv-tag>-->
        <!--<div class="tags">-->
          <!--<iv-tag color="green" >专治不开心</iv-tag>-->
          <!--&lt;!&ndash;<iv-tag :color="index | mapTagColor" :key="tag.id" type="border" v-for ="(tag , index) in article.tagList">{{tag.name}}</iv-tag>&ndash;&gt;-->
          <!--&lt;!&ndash;<span >{{article.type}}</span>&ndash;&gt;-->
          <!--<iv-tag color="green" >123<br></iv-tag><br>-->
          <!--<iv-tag color="green" >123<br></iv-tag>-->
          <!--<iv-tag color="green" >123<br></iv-tag>-->
        <!--</div>-->
        <div v-for="(tag , index) in tagList" color="tag.color" :key="index" style="margin: 0 5px 5px 0;" class="dot-tag">
          <p  :style="{background:tag.color}"
             style="color: white; padding: 10px;letter-spacing:3px;line-height:20px;text-indent:2em;border-radius:1em; ">{{ tag.content}}</p>
      </div>
      </div>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
import Panel from '@/components/utils/Panel'

export default {
  data () {
    return {
      tagList: []
    }
  },
  components: {
    'panel': Panel
  },
  created () {
    this.listTag()
  },
  methods: {
    listTag () {
      this.$http({
        url: this.$http.adornUrl('api/item/saying/selectList'),
        method: 'post'
      }).then((resp) => {
        console.log(resp)
        if (resp.status === 200) {
          this.tagList = resp.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl";

  .tag-wall
    .content
      padding 5px 20px
  .tags
    /*cursor: pointer;*/
    margin: 8px 0
  .pstyle
    width: 300px;
    background: rgb(248, 248, 249);
    border: 1px solid rgb(220, 222, 226);
    font-size: 14px;
    padding: 5px 20px;
    border-radius: 10px;
    color: #2db7f5;
    text-align: justify;
</style>
