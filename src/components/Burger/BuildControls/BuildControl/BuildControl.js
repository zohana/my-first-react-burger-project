import React from 'react';
import Aux from '../../../../hoc/Auxillary';
import classes from './BuildButton.css';


const buildControl = (props) => {
    return (
        <Aux>
            <div className={classes.BuildControl}>
                <div className={classes.Label}>{props.label}</div>   
                <div className={classes.ButtonBox}>     
                    <button 
                        className={classes.Button}
                        onClick={props.added}>
                        More
                    </button>

                    <button 
                        className={classes.Button}
                        onClick={props.removed} 
                        disabled={props.disabled}>
                        Less
                    </button>
                </div>
            </div>
        </Aux>
    );
};

export default buildControl;