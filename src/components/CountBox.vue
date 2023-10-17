<template>
  <div class="count-box">
    <button @click="handleSub" class="minus">-</button>
    <input :value="value" type="text" class="inp" @change="handleChange">
    <button @click="handleAdd" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      const num = +e.target.value
      // 进行校验，如果输入非法字符或<1的数字则回退为原来的数字
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style scoped lang="less">
.count-box {
  width: 110px;
  display: flex;
  .add,.minus {
    width: 30px;
    height: 30px;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    margin: 0 5px;
    border: none;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
