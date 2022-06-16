<template>
  <div class="configBlocks">
    <ul
      v-for="(
        array, key, index
      ) in configBlocksArrays.numberOfSubshellElectrons"
      :key="key"
      :class="key"
    >
      <ul
        v-for="n in numberOfShells[key]['shells']"
        :key="n"
        class="subShell"
      >
        {{ n + index + numberOfShells[key]["symbol"] }}
        <li
          v-for="m in numberOfShells[key]['subShells']"
          :key="m"
          :class="valenceOrbitalClass(n, index, key, m)"
          @click="loadOrbitalModel(n, index, m)"
        >
          <span>{{
            drawElectrons(
              m,
              configBlocksArrays["numberOfSubshellElectrons"][key][n - 1],
              numberOfShells[key]["subShells"]
            )
          }}</span>
        </li>
      </ul>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ConfigBlocksLoop',
  props: {
    shown: Boolean,
  },
  emits: ['clicked'],
  data() {
    return {
      numberOfShells: {
        blockS: {
          shells: 7,
          subShells: 1,
          symbol: 's',
        },
        blockP: {
          shells: 6,
          subShells: 3,
          symbol: 'p',
        },
        blockD: {
          shells: 4,
          subShells: 5,
          symbol: 'd',
        },
        blockF: {
          shells: 2,
          subShells: 7,
          symbol: 'f',
        },
      },
    };
  },
  computed: {
    configBlocksArrays() {
      const splittedConfiguration = this.tabledata[this.showAllInfoIndex].fullElectronicConfiguration.value.split(' ');
      const splittedBlockS = splittedConfiguration.filter((block) => block.match(/\ds\d/));
      const splittedBlockP = splittedConfiguration.filter((block) => block.match(/\dp\d/));
      const splittedBlockD = splittedConfiguration.filter((block) => block.match(/\dd\d/));
      const splittedBlockF = splittedConfiguration.filter((block) => block.match(/\df\d/));
      const numberOfSubshellSElectrons = [];
      const numberOfSubshellPElectrons = [];
      const numberOfSubshellDElectrons = [];
      const numberOfSubshellFElectrons = [];
      splittedBlockS.forEach((el) => {
        numberOfSubshellSElectrons.push(+el.match(/\d+$/)[0]);
      });
      splittedBlockP.forEach((el) => {
        numberOfSubshellPElectrons.push(+el.match(/\d+$/)[0]);
      });
      splittedBlockD.forEach((el) => {
        numberOfSubshellDElectrons.push(+el.match(/\d+$/)[0]);
      });
      splittedBlockF.forEach((el) => {
        numberOfSubshellFElectrons.push(+el.match(/\d+$/)[0]);
      });
      return {
        splittedConfiguration,
        subShellArrays: {
          blockS: splittedBlockS,
          blockP: splittedBlockP,
          blockD: splittedBlockD,
          blockF: splittedBlockF,
        },
        numberOfSubshellElectrons: {
          blockS: numberOfSubshellSElectrons,
          blockP: numberOfSubshellPElectrons,
          blockD: numberOfSubshellDElectrons,
          blockF: numberOfSubshellFElectrons,
        },
      };
    },
    ...mapState(['tabledata', 'showAllInfoIndex']),
  },
  methods: {
    drawElectrons(index, numberOfSubshellElectrons, shells) {
      if (numberOfSubshellElectrons > index + shells - 1) {
        return '↿⇂';
      } if (numberOfSubshellElectrons >= index) {
        return '↿';
      }
      return '';
    },
    valenceOrbitalClass(n, index, key, m) {
      const currentSubShell = n + index + this.numberOfShells[key].symbol + m;
      const currentSubShellFilledWithSecondElectron = n
        + index
        + this.numberOfShells[key].symbol
        + (m + this.numberOfShells[key].subShells);
      const lastAtomsFilledSubShell = this.configBlocksArrays.splittedConfiguration[
        this.configBlocksArrays.splittedConfiguration.length - 1
      ];
      if (
        currentSubShell === lastAtomsFilledSubShell
        || currentSubShellFilledWithSecondElectron === lastAtomsFilledSubShell
      ) {
        this.$store.dispatch('getModel');
        this.$store.commit('mountOrbitalModel', 'viewer');
        this.JmolScript(
          `isosurface phase atomicOrbital ${n + index} ${index} ${-index + (m - 1)}`,
        );
        return 'active';
      }
      return '';
    },
    ...mapMutations(['JmolScript']),
    loadOrbitalModel(n, index, m) {
      const promise = new Promise((resolve) => {
        resolve(this.$emit('clicked'));
      });

      promise.then(() => {
        this.JmolScript(
          `isosurface phase delete;isosurface phase atomicOrbital ${n + index} ${index} ${-index + (m - 1)}`,
        );
      });
    },
  },
};
</script>
