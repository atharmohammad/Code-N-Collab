import React from 'react';
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex';

import Chat from "../Components/Chat";
import Editor from "../Components/Editor/Editor";
import IO from "../Components/IO/IO";
import Problem from "../Components/Problem/Problem";
import {connect} from 'react-redux'

import {
  Grid,
  makeStyles,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import classes from './CollabPage.module.css'
import 'react-reflex/styles.css';

import * as TYPES from '../store/Action/action'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class CollabPage
  extends React.Component {

  render() {
    return (
      <div style={{height:'85vh'}}>

        <ReflexContainer orientation="vertical">

          <ReflexElement
          minSize="10"
          maxSize="350"
          size="250" style={{overflow:'hidden'}}>
              <Problem />
          </ReflexElement>

          <ReflexSplitter className="reflex-thin"  style={{backgroundColor:'#1f273d',
            opacity:'1',border:'0.3px'}}/>

          <ReflexElement orientation="horizontol" maxSize="1500" minSize="400">
                <ReflexContainer >
                    <ReflexElement
                      minSize="100"
                      maxSize="800" style={{overflow:'hidden'}}>
                      <Editor/>
                    </ReflexElement>
                    <ReflexSplitter className="reflex-thin"   style={{backgroundColor:'#1f273d',
                      opacity:'1',border:'0.3px'}}/>
                    <ReflexElement
                        minSize="10"
                        maxSize="200"
                        size="100" style={{overflow:'hidden'}}>
                        <IO />
                      </ReflexElement>
                </ReflexContainer>
            </ReflexElement>

          <ReflexSplitter className="reflex-thin" style={{backgroundColor:'#1f273d',
            opacity:'1',border:'0.3px'}} />

          <ReflexElement
            minSize="10"
            maxSize="270"
            size="200" style={{overflow:'hidden'}}>
            <Chat />
          </ReflexElement>

        </ReflexContainer>

        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.props.output_success} autoHideDuration={3000} onClose={this.props.notify_output_off}>
           <Alert onClose={this.props.notify_output_off} severity="success">
             Code Compiled SuccessFully !
           </Alert>
         </Snackbar>
         <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.props.output_error} autoHideDuration={3000} onClose={this.props.notify_output_error}>
           <Alert onClose={this.props.notify_output_error} severity="error">Something Went Wrong!</Alert>
          </Snackbar>
      </div>
    )
  }
}

const mapStateToProps = state=>{
  return{
    output_success:state.tools.output_success,
    output_error:state.tools.output_error
  }
}

const mapDispatchToProps = dispatch=>{
  return{
    notify_output_off:()=>dispatch({type:TYPES.NOTIFY_OUTPUT_SUCCESS}),
    notify_output_error:()=>dispatch({type:TYPES.NOTIFY_OUTPUT_ERROR})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CollabPage)
