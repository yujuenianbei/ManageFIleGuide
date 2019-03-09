import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../components/main.vue';
import Music from '../components/music.vue';
import Video from '../components/video.vue';
import VideoPlay from '../components/videoPlay/videoPlay.vue';
import MusicPlay from '../components/musicPlay/musicPlay.vue';
Vue.use(Router)

export default new Router({
  routes:[{
  	path: '/home',name: '主站', component: Home
  },{
  	path: '/music',name: '音乐', component: Music
  },{
  	path: '/video',name: '视频', component:Video
  },{
    path: '/videoPlay',name: '视频播放', component:VideoPlay,
    children: [
      { path: '/videoPlay/:id', name: 'video', component: VideoPlay }
    ]
  },{
    path: '/musicPlay',name: '音乐播放', component:MusicPlay,
    children: [
      { path: '/musicPlay/:id', name: 'music', component: MusicPlay }
    ]
  },{
  	path:'*',redirect:'/home'
  }]
})
