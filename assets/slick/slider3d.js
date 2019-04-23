var sliderMyteam = (function(document, $) {

    'use strict';

    var $sliderTeams = $('.slider--teams'),
        $list = $('#list'),
        $listItems = $('#list > li'),
        $nItems = $listItems.length,
        $nView = 3,
        autoSlider,
        $current = 0,
        $isAuto = true,
        $acAuto = 2500,
        $active,

        _init = function() {
            _initWidth();
            _eventInit();
        },

        _initWidth = function() {
            $active = $sliderTeams.find('.active');
            $active.parent().prev().find('figure').addClass('previo');
            $active.parent().next().addClass('nuevo');
            $list.css({
                'margin-left': ~~((100 / $nView)-4) + '%',
                'width': ~~((100 * ($nItems / $nView))+7) + '%',
                'padding-top':'10px',
                'padding-bottom':'10px'
            });
            $listItems.css('width', 100 / $nItems + '%');
            $sliderTeams.velocity({ opacity: 1 }, { display: "block" }, { delay:1000 });
            $list.velocity({
                translateX: ~~((-(100 / $nItems))) + '%',
                translateZ: 0
            }, {
                duration: 1000,
                easing: [400, 26],
                queue: false
            });
        },

        _eventInit = function() {

            window.requestAnimFrame = (function() {
                return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    window.oRequestAnimationFrame      ||
                    window.msRequestAnimationFrame     ||
                    function(callback, element){
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();

            window.requestInterval = function(fn, delay) {
                if( !window.requestAnimationFrame       &&
                    !window.webkitRequestAnimationFrame &&
                    !window.mozRequestAnimationFrame    &&
                    !window.oRequestAnimationFrame      &&
                    !window.msRequestAnimationFrame)
                    return window.setInterval(fn, delay);
                var start = new Date().getTime(),
                    handle = new Object();

                function loop() {
                    var current = new Date().getTime(),
                        delta = current - start;
                    if(delta >= delay) {
                        fn.call();
                        start = new Date().getTime();
                    }
                    handle.value = requestAnimFrame(loop);
                };
                handle.value = requestAnimFrame(loop);
                return handle;
            }

            window.clearRequestInterval = function(handle) {
                window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
                    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)   :
                        window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
                            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
                                window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
                                    clearInterval(handle);
            };

            $.each($listItems, function(i) {
                var $this = $(this);
                $this.on('touchstart click', function(e) {
                    e.preventDefault();
                    _stopMove(i);
                    _moveIt($this, i);
                });
            });

            autoSlider = requestInterval(_autoMove, $acAuto);
        },

        _moveIt = function(obj, x) {

            var n = x;
            var nuevo = obj.next();
            var previo = obj.prev();
            obj.find('figure').addClass('active');
            nuevo.addClass('nuevo');
            previo.find('figure').addClass('previo');
            $listItems.not(obj).find('figure').removeClass('active');
            $listItems.not(nuevo).removeClass('nuevo');
            $listItems.not(previo).find('figure').removeClass('previo');

            $list.velocity({
                translateX: ~~((-(100 / $nItems)) * n) + '%',
                translateZ: 0
            }, {
                duration: 1000,
                easing: [400, 26],
                queue: false
            });

        },

        _autoMove = function(currentSlide) {
            if ($isAuto) {
                $current = ~~(($current + 1) % $nItems);
            } else {
                $current = currentSlide;
            }
            _moveIt($listItems.eq($current), $current);
        },

        _stopMove = function(x) {
            clearRequestInterval(autoSlider);
            $isAuto = false;
            _autoMove(x);
        };

    return {
        init: _init
    };

})(document, jQuery);
$(window).load(function(){
  'use strict';
  //sliderTeam.init();
  sliderMyteam.init();
});