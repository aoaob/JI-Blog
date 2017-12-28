import React from 'react';
import classNames from 'classnames';

export default class ScrollToTopBtn extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            shown: 'none'
        };

        this.scrollTop = 0;

    }

    scrollToTop() {
        function toTop() {
                var timer = null;
                let winscroll =  window.pageYOffset
                    || (document.documentElement && document.documentElement.scrollTop)
                    || document.body.scrollTop
                    || 0;
                var speed = winscroll * 20 / 100;
                window.scrollBy(0, -speed);
                if (winscroll > 0) {
                        timer = setTimeout(toTop, 10);
                } else {
                        clearInterval(timer);
                        timer = null;
                }
                document.addEventListener("touchmove", function() {
                    clearInterval(timer);
                });
        }
        toTop();
    }

    componentDidMount() {
        let height = document.documentElement.clientHeight;
        this.showWhenScrollTo = parseInt( height );
        this.scrollListener = this.handleScroll.bind(this);
        this.attachScrollListener();
    }

    componentDidUpdate () {
        this.attachScrollListener();
    }

    componentWillUnmount () {
        this.detachScrollListener();
    }


    attachScrollListener () {
        window.addEventListener('scroll', this.scrollListener, false);
    }

    detachScrollListener () {
        window.removeEventListener('scroll', this.scrollListener);
    }

    handleScroll () {

        let scrollTop =  window.pageYOffset
                || (document.documentElement && document.documentElement.scrollTop)
                || document.body.scrollTop
                || 0;
        if ( (scrollTop >= this.showWhenScrollTo) && (scrollTop < this.scrollTop) ) {
            this.setState({shown: ''})
        } else {
            this.setState({shown: 'none'})
        }
        this.scrollTop = scrollTop;
    }


    render() {
        let style = {
            // display: this.state.shown
        };
        return (
            <a href="javascript:;" onClick={this.scrollToTop} className={ classNames("backTop animated", {fadeInUp: !this.state.shown, fadeOut: this.state.shown}) } style={style}><i className="iconfont icon-top"></i></a>
        );
    }


}
