var csInterface = new CSInterface();

Vue.component('color-swap', {
  // props: [''],
  template : `
  <div class="viewbox">
    <scope-list></scope-list>
    <div class="divider"></div>
    <style-list></style-list>
    <swapper></swapper>
    <swatch-list></swatch-list>
  </div>
  `,
  data() {
    return {
      // toggleState : {default: false},
    }
  },
  computed: {
  }
})


Vue.component('swatch-list', {
  template: `
    <div class="swatchlist">
      <div
        v-for="swatch in swatches"
        :class="(swatch.isActive) ? 'swatch-active' : 'swatch-idle'"
        @click="sendSwatch(swatch)">
      </div>
    </div>
  `,
  // <div
  //   class="addSwatch"
  //   @click="add">
  // </div>
  data() {
    return {
      swatches : [
        {
          color: '#ffffff',
          key: 0,
          isActive : false,
        },
        {
          color: '#000000',
          key: 1,
          isActive : false,
        },
        {
          color: '#ff0000',
          key: 0,
          isActive : false,
        },
        {
          color: '#0000ff',
          key: 1,
          isActive : false,
        },
      ],
    }
  },
  mounted() {
    this.readSwatches();
    this.updateSwatches();
  },
  methods: {
    readSwatches() {
      //
    },
    updateSwatches() {
      for (var i = 0; i < this.swatches.length; i++) {
        // if (i < this.swatches.length - 1) {
          var targ = this.$el.children[i];
          targ.style.backgroundColor = this.swatches[i].color;
        // }
      }
    },
    add : function () {
      var newSwatch = {
        color: "#454545",
        key: this.swatches.length,
        isActive : false
      };
      this.swatches.push(newSwatch)
      this.updateSwatches();
    },
    clearSwatches: function() {
      for (var i = 0; i < this.swatches.length; i++) {
        this.swatches.pop();
      }
    },
    clearSelected: function() {
      for (var i = 0; i < this.swatches.length; i++) {
        this.swatches[i].isActive = false;
      }
    },
    selectSwatch: function(swatch) {
      this.clearSelected()
      swatch.isActive = true;
    },
    sendSwatch: function(swatch) {
      console.log(swatch.color);
    }
  }
});


Vue.component('swapper', {
  template: `
    <div class="swaplist">
      <div
        :class="(drops[0].isActive) ? 'drop-active' : 'drop-idle'"
        @click="selectDrop(drops[0])">
      </div>
      <div class="flipper"
        @click="flip(drops[0], drops[1])">
        <span :class="(isMinim) ? 'swap-icon-swapV' : 'swap-icon-swapH'"></span>
      </div>
      <div
        :class="(drops[1].isActive) ? 'drop-active' : 'drop-idle'"
        @click="selectDrop(drops[1])">
      </div>
    </div>
  `,
  data() {
    return {
      isMinim: false,
      drops : [
        {
          color: 'transparent',
          key: 0,
          isActive : true
        },
        {
          color: 'transparent',
          key: 1,
          isActive : false
        },
      ],
    }
  },
  mounted: function () {
    this.updateDrops();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    isMin: function() {
      var res = false;
      if (window.matchMedia("(max-width: 60px)").matches)
        res = true;
      else
        res = false;
      return res;
    }
  },
  methods: {
    handleResize (event) {
      if (window.innerWidth < 61) {
        this.isMinim = true;
      } else {
        this.isMinim = false;
      }
    },
    updateDrops: function() {
      var drop1 = this.$el.children[0];
      drop1.style.backgroundColor = this.drops[0].color;
      var drop2 = this.$el.children[2];
      drop2.style.backgroundColor = this.drops[1].color;
    },
    flip: function(drop1, drop2) {
      console.log(drop1, drop2);
    },
    clearSelected: function() {
      for (var i = 0; i < this.drops.length; i++) {
        this.drops[i].isActive = false;
      }
    },
    selectDrop: function(drop) {
      this.clearSelected()
      drop.isActive = true;
    },
  }
});

// Vue.component('swapper', {
//   template: `
//     <div class="swaplist">
//       <div
//         v-for="drop in drops"
//         :class="(drop.isActive) ? 'drop-active' : 'drop-idle'"
//         @click="selectTab(drop)">
//       </div>
//     </div>
//   `,
//   data() {
//     return {
//       drops : [
//         {
//           color: '#ff0000',
//           key: 0,
//           isActive : true
//         },
//         {
//           color: '#0000ff',
//           key: 1,
//           isActive : false
//         },
//       ],
//     }
//   },
//   methods: {
//     clearSelected: function() {
//       for (var i = 0; i < this.drops.length; i++) {
//         this.drops[i].isActive = false;
//       }
//     },
//     selectSwap: function(drop) {
//       this.clearSelected()
//       drop.isActive = true;
//     }
//   }
// });


Vue.component('scope-list', {
  template: `
    <div class="scopelist">
      <div
        v-for="tab in tabs"
        :class="(tab.isActive) ? 'scope-active' : 'scope-idle'"
        @click="selectTab(tab)">
        <div :class="(tab.isActive) ? 'selectorTop-active' : 'selectorTop-idle'"></div>
        <span :class="tab.icon"></span>
        <span class="anno">{{tab.name}}</span>
      </div>
    </div>
  `,
  data() {
    return {
      tabs : [
        {
          name: 'document',
          icon: 'swap-icon-doc',
          key: 0,
          isActive : true
        },
        {
          name: 'artboard',
          icon: 'swap-icon-artboard',
          key: 1,
          isActive : false
        },
        {
          name: 'layer',
          icon: 'swap-icon-layer',
          key: 2,
          isActive : false
        },
        {
          name: 'selection',
          icon: 'swap-icon-selection',
          key: 3,
          isActive : false
        },
      ],
    }
  },
  methods: {
    clearSelected: function() {
      for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].isActive = false;
      }
    },
    selectTab: function(tab) {
      this.clearSelected()
      tab.isActive = true;
    }
  }
});


Vue.component('style-list', {
  template: `
    <div class="stylelist">
      <div
        v-for="tab in tabs"
        :class="(tab.isActive) ? 'style-active' : 'style-idle'"
        @click="selectTab(tab)">
        <span :class="tab.icon"></span>
        <span class="styleanno">{{tab.name}}</span>
        <div :class="(tab.isActive) ? 'selectorBottom-active' : 'selectorBottom-idle'"></div>
      </div>
    </div>
  `,
  data() {
    return {
      tabs : [
        {
          name: 'both',
          key: 0,
          icon: 'swap-icon-both',
          isActive : true
        },
        {
          name: 'fill',
          key: 1,
          icon: 'swap-icon-fill',
          isActive : false
        },
        {
          name: 'stroke',
          key: 2,
          icon: 'swap-icon-stroke',
          isActive : false
        },
      ],
    }
  },
  methods: {
    clearSelected: function() {
      for (var i = 0; i < this.tabs.length; i++) {
        this.tabs[i].isActive = false;
      }
    },
    selectTab: function(tab) {
      this.clearSelected()
      tab.isActive = true;
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
   fullHeight: document.documentElement.clientHeight,
   fullWidth: window.innerWidth,
   cs: {},
  },
  mounted: function () {
    this.cs = new CSInterface();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth
      this.fullHeight = document.documentElement.clientHeight
      // console.log("w:" + this.fullWidth + ", h:" + this.fullHeight);
      // var w = this.fullWidth;
      // if (window.matchMedia("(max-width: 60px)").matches) {
      //   console.log('Folding level 1 - MIN');
      //   csInterface.resizeContent(w, 400)
      // } else if (window.matchMedia("(max-width: 90px)").matches) {
      //   console.log('Folding level 2');
      //   csInterface.resizeContent(w, 300)
      // } else if (window.matchMedia("(max-width: 120px)").matches) {
      //   console.log('Folding level 3');
      //   csInterface.resizeContent(w, 360)
      // } else {
      //   console.log('Folding level 4 - MAX');
      //   csInterface.resizeContent(w, 200)
      // }
    },
    setPanelHeight (h) {
      var w = this.fullWidth;
      var cs = this.cs;
      cs.resizeContent(w,h)
    }
  }
});

// csInterface.resizeContent(400,300)
