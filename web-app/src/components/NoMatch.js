import React from 'react';
//import $ from 'jquery';
import '../style/NoMatch.css';


class NoMatch extends React.Component {
    /*componentDidMount() {
        var formatThousandsNoRounding = function (n,dp) {
            var e='', s=e+n, l=s.length, b=n<0 ? 1 : 0,
                i=s.lastIndexOf(','), j=i===-1 ? l : i,
                r=e, d=s.substr(j+1,dp);
            
            while ((j-=3) > b) {
                r = '.' + s.substr(j,3) + r;
            }

            return s.substr(0,j+3) + r + 
                (dp ? ',' + d + (d.length < dp ? ('00000').substr(0, dp-d.length):e):e);
        };

        var hasRun = false;

        inView('#countUp').on('enter', function() {
            if(hasRun === false) {
                $('.number').each(function() {
                    var $this = $(this),
                    countTo = $this.attr('data-count');
                
                    $({ countNum: $this.text()}).animate({
                        countNum: countTo
                    },
                    {
                        duration: 2000,
                        easing:'swing',
                        step: function() {
                            $this.text(formatThousandsNoRounding(Math.floor(this.countNum)));
                        },
                        complete: function() {
                            $this.text(formatThousandsNoRounding(this.countNum));
                        }
                    });
                });

                hasRun = true;
            }
        });
    }*/


    render() {
        return (

            <React.Fragment>
                <div id='nm-body'>
                    <div className='nm-space'/>
                    <div className='nm-container'>
                        <div className='nm-row'>
                            <div className='xs-12 md-6 nm-mx-auto'>
                                <div id='countUp'>
                                    <div className='number' dataCount='404'> 404 </div>
                                    <div className='text'> Página não encontrada </div>
                                    <div className='text'> HTTP: 404 </div>
                                    <a href='/home'> Me leve de volta </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NoMatch;