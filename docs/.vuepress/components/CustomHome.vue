<template>
  <canvas id="canvas"></canvas>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  },
  mounted () {
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    // 保存canvas的宽、高
    var w = canvas.offsetWidth
    var h = canvas.offsetHeight
    // 注意：canvas实际有2套尺寸，一个是本身大小，另一个是绘图表面的大小，这里处理使它们大小一致，不然会出现拉伸情况
    canvas.width = w
    canvas.height = h

    function Point(x, y) {
      this.x = x 
      this.y = y
      this.r = 1 + Math.random() * 2
      this.sx = Math.random() * 2 - 1
      this.sy = Math.random() * 2 - 1
    }

    Point.prototype.draw = function(ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = '#aaa'
      ctx.fill() 
    }

    Point.prototype.move = function() {
      this.x += this.sx
      this.y += this.sy
      if(this.x > w || this.x < 0) this.sx = -this.sx
      if(this.y > h || this.y < 0) this.sy = -this.sy
    }

    Point.prototype.drawLine = function(ctx, p) {
      var dx = this.x - p.x 
      var dy = this.y - p.y
      var d = Math.sqrt(dx * dx + dy * dy)
      if(d < 100) {
        var alpha = (100 - d) / 100 * 1 
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(p.x, p.y)
        ctx.closePath()
        ctx.strokeStyle = 'rgba(170, 170, 170, ' + alpha + ')'
        ctx.strokeWidth = 1
        ctx.stroke()
      }
    }

    var points = []

    for(var i = 0; i < 40; i++) {
      points.push(new Point(Math.random() * w, Math.random() * h))
    }

    function paint() {
      ctx.clearRect(0, 0, w, h) //清空画布
      for(var i = 0; i < points.length; i++) {
        points[i].move() 
        points[i].draw(ctx)
        for(var j = i + 1; j < points.length; j++) {
          points[i].drawLine(ctx, points[j])
        }
      }
    }
    // 这里使用requestAnimationFrame更新画面
    function loop() {
      requestAnimationFrame(loop)
      paint()
    }
    loop()
  }
}
</script>

<style>
  #canvas {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>