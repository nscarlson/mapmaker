import React from 'react';

import { Link } from 'react-router';

export class Tags extends React.Component {
    constructor(props) {
        super(props);

        this.getRandomHex.bind(this);

        this.tags = [
            {
                id: 'd915c5dc',
                name: 'Turing Machines'
            },

            {
                id: '0f1017ae',
                name: 'Tail Recursion'
            },
            {
                id: '451c76cd',
                name: 'Graph Theory'
            }
        ];

    }

    getRandomHex() {
        var length = 6;
        var chars = '0123456789ABCDEF';
        var hex = '#';

        while(length--) {
            hex += chars[(Math.random() * 16) | 0];
        }

        return hex;
    }

    render() {
        return (
            <div className='tags'>
                {
                    this.tags.map((tag) =>
                        <Link to={'/' + tag.name.replace(/\s/g, '-').toLowerCase()} key={ tag.id }>{tag.name}</Link>
                    )
                }
            </div>
        );
    }
}
