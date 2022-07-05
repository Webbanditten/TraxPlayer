import { css } from "lit";

const styles = css`
  #trax-player .volumecontainer {
    position: relative;
    display: inline-block;
    left: 46px;
    width: 62px;
    top: 6px;
  }

  /* The slider itself */

  #trax-player .volume {
    -webkit-appearance: none;
    appearance: none;
    width: 62px;
    top: -4px;
    background: transparent;
    outline: none;
    width: 62px;
    height: 8px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAICAYAAACh4kz0AAAAPklEQVR42mNgQID/IwSjgP8lZQUjAiN7Hl1w2GJ0z8M5HR0ThzVG9iuGxzdt2jRsMVaPj8SkPmILtxFZnQEAq8le3YS5TpkAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */

  #trax-player .volume::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 8px;
    height: 12px;
    border: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAPElEQVR42mNggID/ODBEsqNjIlYMUwTmbNq0CYVGUQASBAFkGoRJVwAyFkaTrgCvIwn6gqhwwKcAb1ADAKKb0PBPhOk5AAAAAElFTkSuQmCC);
    cursor: pointer;
  }

  #trax-player .volume::-moz-range-thumb {
    width: 8px;
    height: 12px;
    border: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAPElEQVR42mNggID/ODBEsqNjIlYMUwTmbNq0CYVGUQASBAFkGoRJVwAyFkaTrgCvIwn6gqhwwKcAb1ADAKKb0PBPhOk5AAAAAElFTkSuQmCC);
    cursor: pointer;
  }

  #trax-player {
    width: 209px;
    position: relative;
    text-align: left;
    margin-bottom: 10px;
    font-smooth: never;
    -webkit-font-smoothing: subpixel-antialiased;
    image-rendering: optimizeSpeed;
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: pixelated;
    image-rendering: optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
  }

  #trax-player .display {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANEAAAAjCAYAAAAKYO/9AAAAoElEQVR42u3dsQ2AIBRFUUa2MNYOYm3hEA7gUlhDvgbRwuKQnAbq2/JSKk8GmoQnj9MANIhCqh+BC1FIxeWyzcCNKCQBQWdIIgIRwY8j2o8VqIgIRAQiAhGBiEQEIgIRgYhARCICEYGIQEQgIhGBiEBEICIQkYhARCAiEBGISEQgIvhVRMDDf+eEBP1/cVuFgJerEPaJ4IN9Ikt50LmUdwJw/+GiroXQ8QAAAABJRU5ErkJggg==);
    height: 35px;
    background-repeat: no-repeat;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 10px;
    color: #000;
  }

  #trax-player .display-inner {
    padding-left: 7px;
    padding-right: 9px;
    padding-top: 4px;
  }

  #trax-player .time {
    float: right;
    margin-top: -13px;
  }

  #trax-player .time .length {
    color: #9eac82;
    padding-left: 6px;
  }

  #trax-player .loading {
    background-image: url(data:image/gif;base64,R0lGODlhPwASAPMAAAAAAAAAABMVESYoIUdMPmNpVnyEbJCafqKsja+6mbjEob7KpgAAAAAAAAAAAAAAACH5BAkKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAPwASAAAEszCERau9VqmV0kLIchyLYSxFsRDEMgyLICwSPdV4ANRYf2kcD0hEMqFULBdMZmvmbACfdEqtVncTq3a7lWC54HDPKy6bKV9rlsJr2rI3Nntd9bapazhNrr/F6Wo6XHl8EnF7f4lcaXUVfXyQj3uBjHg8l4WScIBTZGefi3egoxd2nKSknqirF19PT0wvKy0pJScjHyEdC0Bhpk5+TbEwSbVGuEO7vWBeAM7P0NHS09TV1tQRACH5BAkKAAAALAAAAAA/ABIAAASzMIQl6ax16c37VsqSJAuCLMexGMZSFAtBLMOwCIIFYFdveUAPSEQyoVQsF0xGs+F0wah0SqXuJtWsViu5br9gYDdMLmu8Vawm87NgL+u1mtplT9VvSjzvg2/HXBt8En5wfW1ZaHSCe416hXqRdAGKdxmXe5h5iJMAZp9flaCjHXVzpKhQqascXk81MTMvKy0pJScjC0NgPD88rjmwTLNJtka5u1+9y5QAzs/Q0dLT1NXW1BEAIfkECQoAAAAsAAAAAD8AEgAABLAwhCXprPhqu7r/4KcoS5IsCLIcx2IYS1EAGVffW6iDY3mmq9YrNtsZj8hkkjZROp9PAoEJrVp1UsB1y+0ABAJns1MhNyVnCtn8HAy+YeU4TV9vLlW39jm3o9VqeBgcTwBuYh51gXaAeIBJYIYDYmWVfopnY5ACe12ehVKfokYSAKGjqB+lqawgADIuMCwoKiYLPVY4Nne8rwWxQbQ+tyS5vLvIGQDLzM3Oz9DR0tPSEQAh+QQJCgAAACwAAAAAPwASAAAErZCQNcYSYoWg+e7gJ3rkYp5oiirKkiSARFlYWI52/ql8yrqwnnBILBYBhYJxyWwiEEhlc0pVPQHVrNYEMBiWnNMO1Al7TOaw8XDofo1qswY9n9/qTDaWGadvRH52Z2NGAGxgYoF2gXJyRl6GB2A7lH6VjoREkFucUwBPnaFCSZ8IoqcppKirKQAvCz9UOLM3tSA1FQsSrgmwLbK2tDoluBa7AMjJysvMzc7P0M4RACH5BAkKAAAALAAAAAA/ABIAAASyEKF1zjJmlbIIWcOwCMISBCZ6puzqqvAiz7QMSJSFaZwHiqRW7CUsrmpIAHLJbDqfT0AiAa1ar8kpdsttKrvg8AKgUFhRsyMrhVbJ2ugr2VyNt01vPH6o337PaXknLoJ7bmpVf3WBe4WNd3dVZYpQg2+RMJB5a5IKlGKgUJ+hpDVTo6Wpp6msS6g0RLFDsyxBIR0fGxcZFQsSr2m0skYxtiI+uju9vwDNzs/Q0dLT1NXTEQA7);
    background-position: center;
    width: 100%;
    top: 10px;
    background-repeat: no-repeat;
    height: 18px;
    position: absolute;
  }

  #trax-player .volumecontainer .volume-indicator {
    width: 62px;
    height: 9px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAJCAYAAABqvp9RAAAAcElEQVR42mNgGHrgPxompA5dDKfiwe7J/x0dE8EYj3vxyf8nJoQGoydxeRyuF488Cvs/gRAabJ7E6TGYOJ4U8R/F49gMH8SeJMfj/2ntcXp4knoxTmZSHyhPUi2PE1O4DSZPUr1UZyDV44NIjOR6HADFOoBhugUZaAAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
  }

  #trax-player .volumecontainer .volume-indicator-filled {
    width: 62px;
    height: 9px;
    position: relative;
    overflow: hidden;
  }

  #trax-player .volumecontainer .volume-indicator-filled-bg {
    height: 9px;
    width: 62px;
    position: absolute;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAJCAYAAABqvp9RAAAAaElEQVR42tWVWwoAIAgEvf+lt6+CBB+F1bYQhFo0Zibyn6BGFKdtZjA7JLqc83p+ZDLECGmBj7WOf5ojyBAbpAmm5ZQ6zM2JIXfAcRr8BmTdjW+W+ivIsjeeaW5MkOVdXVbBiWzL/3gDO9LtITnoaoIAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-size: 62px 9px;
  }

  #trax-player .music-activity {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAZCAYAAABzVH1EAAAAbklEQVR42mNgQID/QxSjgP8lZQVDEiN7Bl1wyGB0z8A5QdXu/9WjxWjGLi91/p8XqYKXXeqm/T9XSopo9qhHRj0y6pFRj4x6ZHB4ZNhUiEMZD88YGc3sox4Z9cioR0Y9MuqRkd5EGTajKMNiXAsANqlsTHMjdyUAAAAASUVORK5CYII=);
    width: 50px;
    height: 25px;
    float: right;
    position: relative;
    top: 6px;
  }

  #trax-player .music-activity.playing {
    background: url(data:image/gif;base64,R0lGODlhMgAZAPMAAAAAAAAAAG0aGidbFnVGK25ZJFJ7R3d1Q3R2cAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAMgAZAAAEuxCAQKu9OOsd5ERgKI5kaZ5IF4Bc67bsGhjDXNN2ju/1UQQ+4I8gCBCNxWNKxtPdnk6hNHisJovLVHMLbQa/wytynI1yzb0feGwlU7TdOHqqDrPF5bMeuqaK23lyezl9dm1Kb3ODOIV3jllLL5KTMSiWl5iVkZOcHJWKgnx1Uod4iYuhdKR/pkypg42lbq6gc7Gss3C1Z7eOiLSoUb2ygbtyw7jFwV6jfr5Yb5ud0xcsH5nY2R0S1N0ZEhEAIfkECQoAAAAsAAAAADIAGQCDAAAAAAAAbRoaJ1sWdUYrblkkUntHd3VDdHZwM8wAg/xkAAAAAAAAAAAAAAAAAAAABNUQgECrvTjrHeREYCiOZGmeSBeAXOu27BooyVzTdm4Mwd7zh0IgOBQSBIFjEqlMyXDQm/RH9RGvRqZ2KXtOozqezyrEcpVopDMFbtfGYmB5ft42Keyvvhov+olpdV15OW58VGaAdltrhXs4cIh0ioJ3Xo6YkWR/WZVqeE4voqMxKKanqKWho6wcpZhgmn2JnYGWhIaykpyeXI2GkH2RtL23sFO6m2a2jHjHYYfKdMy+zsBvwrOTtYuDz8HRcrzUxtfhu8vdt6ut7RcsH6ny8x0S7vcZEhEAIfkECQoAAAAsAAAAADIAGQCDAAAAAAAAbRoadUYrblkkd3VDdHZwM8wA87QYg/xk9e9cAAAAAAAAAAAAAAAAAAAABMEQgECrvTjrHeQ0YCiOZGmeRheAXOu27Bokx1zTdo7vtYIEvkCBEBgIikcjUibj6W7QJ/AXHC6V2GOqGXV6o8EqMXvVUlJfaTr8s5LJW3R3ru5R2+Okfhmv+51sQnllfGd/dIB3goRwhmmPYIpue40rWy+YmTEonJ2em5eZohybh6aBk4xmXKZrkoNvq3KtdKiwlLK0fraqhayQu6+9Sn3AwLyxvrPGtcLJxI6I0jnIuMqho9kXLB+f3t8dEtrjGRIRACH5BAkKAAAALAAAAAAyABkAgwAAAAAAAG0aGidbFnVGK25ZJFJ7R3d1Q3R2cDPMAIP8ZAAAAAAAAAAAAAAAAAAAAATGEIBAq7046x3kRGAojmRpnkgXgFzrtuwaKMlc03aO7/VRBD7gjyAIEI3FY0rG092eTqE0eKwmi8tUcwttBr/DK3KcjXLNvR94bCVTtN04eqoOs8Xlsx66porbeXJ7OX12bUpvc4M4hXeOWUsvkpMxKJaXmJWRk5wclYqCNQYDdFKHeImLcqOlfo6ITKFzrI2nbrGgUbR1pn+ouKo5u6W2sHC5TcNrxVipsmfKvMwywM9Q0b2vzSubnd4XLB+Z4+QdEt/oGRIRACH5BAkKAAAALAAAAAAyABkAgwAAAAAAAG0aGidbFnVGK25ZJFJ7R3d1Q3R2cDPMAIP8ZAAAAAAAAAAAAAAAAAAAAATSEIBAq7046x3kRGAojmRpnkgXgFzrtuwaKMlc04Ex5LvO/4dCIDgUEgSBYxKpTMlw0Jpv2qsWr0Sllol0pqK2H1W8I5qN3KXaGwaP32XhWb1dU763PHnvm2fTdWxgOHB7fmh0aYJ6hFaFh4mRi21SjpZYcoh1TXdOL5+gMSijpKWinqCpHKKUfJd9mVebinethY+xf5GcT3q3l5Czdr1hv4a5moBdtW6vwMi7tMSNrseY0cN4xc7Wc8K82tTGsNffyyuoquoXLB+m7/AdEuv0GRIRACH5BAkKAAAALAAAAAAyABkAgwAAAAAAAG0aGnVGK3R2cPUAAP92JTPMAPO0GIP8ZPXvXAAAAAAAAAAAAAAAAAAAAATAEIBAq7046x3kJGAojmRpnkQXgFzrtuwaJMdc03aO77WCBD7gz1AIDARG5FEm4+lu0KdwGiQmr8tUM+rsRoPgYXFJRmpTXmk6PLWWr2c1d55jV8fKPBNNTzvtYlh6cX59Xz9sbnpZFHxyjziAAYqCe1ovmJkxKJydnpuXmaIcm5CGdYiplW+Ep4VUqm+sjaa1krKDtK+vt4u5W7VrqkG4cLqup72rZsfBdMrFrc5S0L6Wo9gbLB+f3d4dEtniGRIRACH5BAkKAAAALAAAAAAyABkAgwAAAAAAAG0aGnVGK25ZJHd1Q3R2cDPMAPO0GIP8ZPXvXAAAAAAAAAAAAAAAAAAAAATEEIBAq7046x3kNGAojmRpnkYXgFzrtuwaJMdc03aO77WCBAUCUDgQBIpHIzIl4+lu0GfAN6wir0ojM+XsRp3UoDWbLG+lXnTvJxZjy0sK90tXT9lCN/l9TvujYXlEe2R9dX85gWNwhXJ2iDiKeoxmckwvmJkxKJydnpuXmaIcm4+HgHiLb3FNp6Z3VZOrWo6QrpKDlKxzr2m4uo2tvXW/s5XCtlLFhMe8yWCpssyGw8rRucZboaPcFywfn+HiHRLd5hkSEQAh+QQJCgAAACwAAAAAMgAZAIMAAAAAAABtGhonWxZ1RituWSRSe0d3dUN0dnAzzACD/GQAAAAAAAAAAAAAAAAAAAAE1BCAQKu9OOsd5ERgKI5kaZ5IF4Bc67bsGijJXNN2bgzB3vOHQiA4FBIEgWMSqUzJcNCb9Ef1Ea9GpnYpe06jOp7PKsRylWikMwVu18ZiYHl+3jYp7K++Gi/6iWl1XXk5bnxUZoB2W2uFezhwiHSKgndejpiRZH9ZlWp4Ti+iozEopqeopaGjrBylmIaacpyeXI2GYLK0lIGWhLhvfZtmvYx4sHu6iZ3Fg8iZwrPEi7bHwGGHy7W+z7nRu8zUt49TypPhgmurrewXLB+p8fIdEu32GRIRACH5BAkKAAAALAAAAAAyABkAgwAAAAAAAG0aGidbFnVGK25ZJFJ7R3d1Q3R2cDPMAIP8ZAAAAAAAAAAAAAAAAAAAAATQEIBAq7046x3kRGAojmRpnkgXgFzrtuwaKMlc03aOG0PAB4cCUBgMEARG5DEpk+Get2ju9ytahcusEplySqG6GrV3HTK1zG4KzJaOzWU0Wh2ug9/lonzbXH//Uz1VRIRnfEt0bXZigmSFeod8iYCKeI9YkWkUMS+dnjEooaKjoF2epzCTi3WWcJiGml6rd42uZnuxfrNutXmvuKqKtD6OtriIm7usvZewc8nCgK1xmciy0YHEtpDOXNCU0szG1d4rpqjoGCwfpO3uHRLp8hkSEQAh+QQJCgAAACwAAAAAMgAZAIMAAAAAAABtGhonWxZ1RituWSRSe0d3dUN0dnAzzACD/GQAAAAAAAAAAAAAAAAAAAAE0BCAQKu9OOsd5ERgKI5kaZ5IF4Bc67bsGijJXBtDgOv57ueHQiA4FBIEgWMSqUzJaDae9DcFColEpZaJdKagUKq4Zy2at8u0NxomV9/Yq5GbblK+tfZ7bI7X6XZPeTdufDt+WYB0a2CEe4VlfmhojIOPl4hzf2p3Ti+foDEoo6Slop6gqRyibI6GbpmblHetl3yxk4u0jbaQfXKyuoJRr3DAicEyw3rFh8eaucp4xL63z8mB08zVsNfR2bXN3b/YXZ2q6BssH6bt7h0S6fIZEhEAIfkECQoAAAAsAAAAADIAGQCDAAAAAAAAbRoadUYrdHZw9QAA/3YlM8wA87QYg/xk9e9cAAAAAAAAAAAAAAAAAAAABMUQgECrvTjrHeQkYCiOZGmeRBeAXOu27Bokx1zTdo7vtYIEPuDPUAgQjcWBQCbj6W7Qp3AaPFqTy1Qz6uxGg+Bh8RpQMlNeaTo8JR/NWjR3ru792G7suc53sqtjgWVZFHJ9dDh/YkiMcIWHkIqMZI4rWi+YmTEonJ2em5eZohybkGmJd6mTgpWGp4h2VIuUhFumdJJ5g3uvkaqAq7txt3y5gm+1rrDFv7OsycRrzcHIvMu9xsGtoaPdFywfn+LjHRLe5xkSEQAh+QQJCgAAACwAAAAAMgAZAIMAAAAAAABtGhp1Rit0dnD1AAD/diUzzADztBiD/GT171wAAAAAAAAAAAAAAAAAAAAEwxCAQKu9OOsd5CRgKI5kaZ5EF4Bc67bsGiTHXNN2ju+1ggQ+4G8gCBCNxWNKxtPdnk6hNHisJovLVHMLbQa/wytynI1yzb0feGwlU7TdOHqqDrPF5bMeuqaK23lyezl9dm1Kb3ODOIV3jllLL5KTMSiWl5iVkZOcHJWKgnx1UgYFjohMoaB0pKaHWImLqo2lp7Cpq2e0rn+3cLlyu7YyuLJRwq/Ev8Zeo0G1yYHAx84/0L3Km53bFywfmeDhHRLc5RkSEQAh+QQJCgAAACwAAAAAMgAZAIMAAAAAAABtGhonWxZ1RituWSRSe0d3dUN0dnAzzACD/GQAAAAAAAAAAAAAAAAAAAAEyxCAQKu9OOsd5ERgKI5kaZ5IF4Bc67bsGijJXNN2jhtDwAeHAlAYDBAERuQxKZPhnrdo7vcrWoXLrBKZckqhuhq1dx0ytcxuCsyWjs1lNFodroPf5aJ821x//1M9VUSEZ3xLdG12YoJkhXqHfImAiniPWJFpFDEvnZ4xKKGio6Bdnqcwk4urg3CYhppeq5WOrrBzm7OUjLaQt1y5isK8ea97fbqstXGZiMG7yr3GmarDda3Mv8jWtNLaziumqOMYLB+k6OkdEuTtGRIRACH5BAkKAAAALAAAAAAyABkAgwAAAAAAAG0aGidbFnVGK25ZJFJ7R3d1Q3R2cDPMAIP8ZAAAAAAAAAAAAAAAAAAAAATLEIBAq7046x3kRGAojmRpnkgXgFzrtuwaKMlc03aOG0PAB4cCUBgMEARG5DEpk+Get2ju9ytahcusEplySqG6GrV3HTK1zG4KzJaOzWU0Wh2ug9/lonzbXH//Uz1VRIRnfEt0bXZigmSFeod8iYCKeI9YkWkUMS+dnjEooaKjoF2epzCTi6uDcJiGml6rlY6usHObs5SMtpC3XLmKwrx5r3t9uqy1cZmIwbvKvcaZqsN1rcy/yNa00trOK6ao4xgsH6To6R0S5O0ZEhEAIfkECQoAAAAsAAAAADIAGQCDAAAAAAAAbRoaJ1sWdUYrblkkUntHd3VDdHZwM8wAg/xkAAAAAAAAAAAAAAAAAAAABNQQgECrvTjrHeREYCiOZGmeSBeAXOu27BooyVzTgTHku87/h0IgOBQSBIFjEqlMyXDQmm/aqxavRKWWiXSmorYfVbwjmo3cpdobBo/fZeFZvV1Tvrc8ee+bZ9N1bGA4cHt+aHRpgnqEVoWHiZGLbVKOllhyiHVNd04vn6AxKKOkpaKeoKkcopSthX2ZV5uKd61ul7CYkYG1g3qvcbqzdk+Mv7jBc8OcxbaVfMmxy129xmHAun+71M2+0ECx2sOT3tiQ0zIrqKrsFywfpvHyHRLt9hkSEQAh+QQJCgAAACwAAAAAMgAZAIMAAAAAAABtGhp1Rit0dnD1AAD/diUzzADztBiD/GT171wAAAAAAAAAAAAAAAAAAAAExBCAQKu9OOsd5CRgKI5kaZ5EF4Bc67bsGiTHXNN2ju+1ggQ+4M9QCBCNxWNKxtPdnk6hNHisJovLVHMLbQa/wytynI1yzb0feGwlU7TdOHqqDrPF5bMeuqaK23lyezl9dm1Kb3ODOIV3jllLL5KTMSiWl5iVkZOcHJWKgnx1UodFAwIyTKGgdKR/pqiBrGeNpQGnqXCzcrWvt7GJi6u9jriywlHEbcbBq4PKYsyqu8mjfsXAK5ud3BcsH5nh4h0S3eYZEhEAIfkECQoAAAAsAAAAADIAGQCDAAAAAAAAbRoadUYrdHZw9QAA/3YlM8wA87QYg/xk9e9cAAAAAAAAAAAAAAAAAAAABMAQgECrvTjrHeQkYCiOZGmeRBeAXOu27Bokx1zTdo7vtYIEPuDPUAgMBEbkUSbj6W7Qp3AaJCavy1Qz6uxGg+BhcUlGalNeaTo8tZavZzV3nmNXx8o8E01PO+1iWHpxfn1fP2xuelkUfHKPOIABioJ7Wi+YmTEonJ2em5eZohybkIZ1iKmVb4SnhVSqb6yNprWSsoO0r6+3i7lbtWuqQbhwuq6nvatmx8F0ysWtzlLQvpaj2BssH5/d3h0S2eIZEhEAIfkECQoAAAAsAAAAADIAGQCDAAAAAAAAbRoadUYrdHZw9QAA/3YlM8wA87QYg/xk9e9cAAAAAAAAAAAAAAAAAAAABMgQgECrvTjrHeQkYCiOZGmeRBeAXOu27Bokx1zTdo7vtYIEPuDPUAgMBEbkUSbj6W7Qp3AaJCavy1Qz6uxGg+BhcUlGalNeaTo8tZavZzV3nmNXx8o8E01PO+1iWHpxfn1fP2xuelkUfHKPOIABioJ7Wi+YmTEonJ2em5eZohybkIZ1iKmTRZSMW6aPklatZo2whVSqs3hwtri4sqy8ro6/dMGrlYSnwKp3yW/Lt8fOgbR707HVyddnoaPgFywfn+XmHRLh6hkSEQAh+QQJCgAAACwAAAAAMgAZAIMAAAAAAABtGhp1RituWSR3dUN0dnAzzADztBiD/GT171wAAAAAAAAAAAAAAAAAAAAEyBCAQKu9OOsd5DRgKI5kaZ5GF4Bc67bsGiTHXNN2ju+1ggQFAlA4EASKRyMyJePpbtBnwDesIq9KIzPl7Ead1KA1myxvpV507ycWY8tLCvdLV0/ZQjf5fU77o2F5RHtkfXV/OYFjcIVydog4inqMZnJML5iZMSicnZ6bl5miHJuPh4A/im98jpCnd7CTq1qtr4hUqoSVTbavuHiUrLymdr+LszLDrlLGsrqGxGnNg8G0yr3MqcDIcSuho+AXLB+f5eYdEuHqGRIRADs=);
  }

  #trax-player .control button {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAvklEQVR42mNgQAX/qYixgv8lZQVUw9gsQpekCGOzCEXw9u37/9EBSIwUjM0iDAs2bdpEEe7omPgf2VwUS9AtgHmfZpaA+Lat6mBMqmUkWeK7RR+MSbWMLEtItYxkSypeh8IxsZbhtQSUuvBZQqxlVLEE2SJ0y8i2BD1ucGGyLSEGU+wTYg0HYZDhVLMEl+FkRzwphlNkCbGGk2UJqYaTbAlMISmGk2wJTeoTmABIAaWYqCqYFnU83VorNG13AQCkIxDhwZjMKgAAAABJRU5ErkJggg==);
    width: 25px;
    font-size: 0px;
    border: 0px;
    margin-top: 6px;
    cursor: pointer;
    height: 25px;
  }

  #trax-player .control {
    float: left;
    position: relative;
  }

  #trax-player .control button.playing {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAmklEQVR42mNgQAX/qYixgv8lZQVUw9gsQpekCGOzCEXw9u37/9EBSIwUjM0iDAs2bdpEEe7omPgf2VwUS6hhAcmWkBIPZFkC4nsnJBCNkS0iyZLk+nqiMUWWTF2zhiAmyRJQ6hrellA1TrBZQvWIH7WEIktokuORLYEpJBaD1JNsCc1KYZpbAhMAKaAUE1UF06KOp1trhabtLgCZHhIhlzCPLwAAAABJRU5ErkJggg==);
  }
`;

export default styles;
