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

import {
  Grid,
  makeStyles,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";

import 'react-reflex/styles.css';

export default class ReflexBasicSplitterDemo
  extends React.Component {

  render() {

    return (
      <div style={{height:'85vh'}}>

        <ReflexContainer orientation="vertical">

          <ReflexElement
          minSize="10"
          maxSize="250">
              <Problem />
          </ReflexElement>

          <ReflexSplitter className="reflex-thin" />

          <ReflexElement orientation="horizontol" maxSize="1500" minSize="400">
                <ReflexContainer >
                  <ReflexElement
                      minSize="10"
                      maxSize="300">
                      <div className="pane-content">
                        <label>
                          GRAPH-VISUALIZER
                        </label>
                      </div>
                    </ReflexElement>

                    <ReflexSplitter className="reflex-thin" />

                    <ReflexElement
                      minSize="100"
                      maxSize="4000">
                      <Editor/>
                    </ReflexElement>
                    <ReflexSplitter className="reflex-thin" />
                    <ReflexElement
                        minSize="10"
                        maxSize="100">
                        <IO />
                      </ReflexElement>
                </ReflexContainer>
            </ReflexElement>

          <ReflexSplitter className="reflex-thin" />

          <ReflexElement
            minSize="10"
            maxSize="200">
            <Chat />
          </ReflexElement>

        </ReflexContainer>

      </div>
    )
  }
}
