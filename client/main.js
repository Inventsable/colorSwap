// var csInterface = new CSInterface();
// var appSkin = csInterface.hostEnvironment.appSkinInfo;
// var sysPath = csInterface.getSystemPath(SystemPath.EXTENSION);
// var logPath = sysPath + "/log/";
// var hostPath = sysPath + "/host/";
// var appName = csInterface.hostEnvironment.appName;

// loadUniversalJSXLibraries();
// console.log(`Loading for ${appName}`);
// loadJSX(`${appName}.jsx`);
// console.log(appUI);

Vue.component('color-swap', {
  // props: ['icon', 'toggle'],
  template : `
  <div class="viewbox">
    <scope-list></scope-list>
    <div class="divider"></div>
    <style-list></style-list>
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
        @click="selectSwatch(swatch)">
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
          isActive : true
        },
        {
          color: '#000000',
          key: 1,
          isActive : false
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
        // key: this.swatches.length,
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
    }
  }
});

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

  },
  methods: {

  },
  updated() {
    if (window.matchMedia("(max-width: 120px)").matches) {
      console.log('Folding level 1');
    } else if (window.matchMedia("(max-width: 90px)").matches) {
      console.log('Folding level 2');
    } else if (window.matchMedia("(max-width: 60px)").matches) {
      console.log('Folding level 3');
    } else {
      /* Maximum */
    }
  }
});
