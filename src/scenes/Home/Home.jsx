import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Dropzone from 'react-dropzone'

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='content'>
                <Dropzone>
                    {({isDragActive, isDragReject, acceptedFiles, rejectedFiles}) => {
                        if (isDragActive) {
                            return "This file is authorized";
                        }
                        if (isDragReject) {
                            return "This file is not authorized";
                        }
                        return acceptedFiles.length || rejectedFiles.length
                            ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                            : "Try dropping some files";
                    }}
                </Dropzone>

            </div>
        )
    }
}

export default Home;
