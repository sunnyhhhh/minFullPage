pageEngine
  .init(".wrapper", [
    "rgb(27, 188, 155)",
    "rgb(75, 191, 195)",
    "rgb(123, 170, 190)",
    "rgb(255, 153, 0)"
  ])
  .addSection("oneSection")
    .addComponent({
        type: "base",
        text: "第一屏",
        css: {
        textAlign: "center",
        verticalAlign: "middle",
        fontSize: "50px",
        color: "#000",
        },
        animateIn: {
            top: 240,
            opacity: 1
        },
        delay: 200,
        animateOut: {
            top: 0,
            opacity: 0
        }
    })
  .addSection("twoSection")
    .addSlide("oneSlide")
        .addComponent({
            text: "第二屏的第一屏",
            css: {
            textAlign: "center",
            verticalAlign: "middle",
            fontSize: "50px",
            color: "#000"
            },
            animateIn: {
                top: 240,
                opacity: 1
            },
            delay: 200,
            animateOut: {
                top: 0,
                opacity: 0
            }
        })
    .addSlide('twoSlide')
        .addComponent({
            text: "第二屏的第二屏",
            css: {
            textAlign: "center",
            verticalAlign: "middle",
            fontSize: "50px",
            color: "#000"
            },
            animateIn: {
                top: 240,
                opacity: 1
            },
            delay: 200,
            animateOut: {
                top: 0,
                opacity: 0
            }
        })
    .addSlide('twoSlide')
        .addComponent({
            text: "第二屏的第三屏",
            css: {
            textAlign: "center",
            verticalAlign: "middle",
            fontSize: "50px",
            color: "#000"
            },
            animateIn: {
                top: 240,
                opacity: 1
            },
            delay: 200,
            animateOut: {
                top: 0,
                opacity: 0
            }
        })
  .addSection('treeSection')
    .addComponent({
        type: "base",
        text: "第三屏",
        css: {
        textAlign: "center",
        verticalAlign: "middle",
        fontSize: "50px",
        color: "#000"
        },
        animateIn: {
            top: 240,
            opacity: 1
        },
        delay: 200,
        animateOut: {
            top: 0,
            opacity: 0
        }
    })
    .load();
