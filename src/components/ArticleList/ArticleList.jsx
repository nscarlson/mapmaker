import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Marked from 'marked';
import { Tags } from 'components/Tags';

export class ArticleList extends Component {

    constructor (props) {
        super(props);
        this.rawMarkup.bind(this);
        this.getRandomHex.bind(this);
        this.state = {
            'articles' : [
                {
                    'id': '5cf8b0a8',
                    'title': 'Markdown Example',
                    'content': '\n\n-------------\n\nParagraphs are separated by a blank line.\n\n2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\nlook like:\n\n* this one\n* that one\n* the other one\n\nNote that --- not considering the asterisk --- the actual text\ncontent starts at 4-columns in.\n\n> Block quotes are\n> written like so.\n>\n> They can span multiple paragraphs,\n> if you like.\n\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it\'s all\nin chapters 12--14"). Three dots ... will be converted to an ellipsis.\nUnicode is supported. ☺\n\n\n\nAn h2 header\n==========\n\nHere\'s a numbered list:\n\n1. first item\n2. second item\n3. third item\n\nNote again how the actual text starts at 4 columns in (4 characters\nfrom the left side). Here\'s a code sample:\n\n# Let me re-iterate ...\nfor i in 1 .. 10 { do-something(i) }\n\nAs you probably guessed, indented 4 spaces. By the way, instead of\nindenting the block, you can use delimited blocks, if you like:\n\n~~~\ndefine foobar() {\nprint "Welcome to flavor country!";\n}\n~~~\n\n(which makes copying & pasting easier). You can optionally mark the\ndelimited block for Pandoc to syntax highlight it:\n\n~~~python\nimport time\n# Quick, count to ten!\nfor i in range(10):\n# (but not *too* quick)\ntime.sleep(0.5)\nprint i\n~~~\n\n\n\n### An h3 header ###\n\nNow a nested list:\n\n1. First, get these ingredients:\n\n  * carrots\n  * celery\n  * lentils\n\n2. Boil some water.\n\n3. Dump everything in the pot and follow\nthis algorithm:\n\n    find wooden spoon\n    uncover pot\n    stir\n    cover pot\n    balance wooden spoon precariously on pot handle\n    wait 10 minutes\n    goto first step (or shut off burner when done)\n\nDo not bump wooden spoon or it will fall.\n\nNotice again how text always lines up on 4-space indents (including\nthat last line which continues item 3 above).\n\nHere\'s a link to [a website](http://foo.bar), to a [local\ndoc](local-doc.html), and to a [section heading in the current\ndoc](#an-h2-header). Here\'s a footnote [^1].\n\n[^1]: Footnote text goes here.\n\nTables can look like this:\n\nsize  material        color\n----  ------------  ------------\n9     leather         brown\n10    hemp canvas   natural\n11    glass           transparent\n\nTable: Shoes, their sizes, and what they\'re made of\n\n(The above is the caption for the table.) Pandoc also supports\nmulti-line tables:\n\n--------  -----------------------\nkeyword   text\n--------  -----------------------\nred         Sunsets, apples, and\n        other red or reddish\n        things.\n\ngreen     Leaves, grass, frogs\n        and other things it\'s\n        not easy being.\n--------  -----------------------\n\nA horizontal rule follows.\n\n***\n\nHere\'s a definition list:\n\napples\n: Good for making applesauce.\noranges\n: Citrus!\ntomatoes\n: There\'s no "e" in tomatoe.\n\nAgain, text is indented 4 spaces. (Put a blank line between each\nterm/definition pair to spread things out more.)\n\nHere\'s a "line block":\n\n| Line one\n|   Line too\n| Line tree\n\nand images can be specified like so:\n\n![example image](example-image.jpg "An exemplary image")\n\nInline math equations go in like so: $\omega = d\phi / dt$. \n\nmath should get its own line and be put in in double-dollarsigns:\n\n$$I = \int \rho R^{2} dV$$\n\nAnd note that you can backslash-escape any punctuation characters\nwhich you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.'
                },
                {
                    'id': 'e091a70e',
                    'title': 'Lorem Ipsum',
                    'content': '----------\n\nDonec sed odio dui. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.\n\nNulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam.\n\nNullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec ullamcorper nulla non metus auctor fringilla.\n\nFusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper nulla non metus auctor fringilla. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus. Sed posuere consectetur est at lobortis.'
                }
            ]
        };

        this.rows=[<Tags/>, <Tags/>];
    }
    getRandomHex() {
        var length = 8;
        var chars = '0123456789ABCDEF';
        var hex = '';
        while(length--) hex += chars[(Math.random() * 16) | 0];
        return hex;
    }

    rawMarkup(content) {
        return { __html: Marked(content, {sanitize: true}) };
    }

    render() {
        return (
            <div id='articles-container'>
                {
                    this.state.articles.map((article) =>
                        <div>
                            <article key={ article.id }>
                                <h1>{ article.title }</h1>
                                <div className='content'
                                    dangerouslySetInnerHTML={this.rawMarkup(article.content)}
                                />
                            </article>
                            <Tags/>
                        </div>
                    )
                }
            </div>
        );
    }
}
