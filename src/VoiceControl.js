import React, {Component} from 'react';
import SpeechRecognition from "react-speech-recognition";
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Speech from 'speak-tts'
import {Button, Icon, Label, Transition, Message} from 'semantic-ui-react'

//user md

class VoiceControl extends Component {
    state = {
        visibleLabel: true,
        input: '',
        speech: null,
        showAnswer:'grey',
        answer:' '
    }

    interpretResult = () => {

        if(this.state.answer == null || this.state.answer === '') {
            console.log('Here');
            console.log(this.state);
            this.setState({
                visibleLabel:true,
                showAnswer: 'grey'
            })
            this.props.resetTranscript();
            return;
        }

        this.setState({
            showAnswer: 'teal'
        })
        var self = this;
        this.state.speech.speak({text: this.state.answer,
            queue: false,
            listeners: {
                onend: () => {
                    self.setState({
                        visibleLabel:true,
                        showAnswer: 'grey'
                    })
                    self.props.resetTranscript();
                },
            }
        })
    }

    evaluateListening = () => {
        var transcriptCopy = this.props.transcript;
        var self = this;
        setTimeout(function(){
            if(transcriptCopy == self.props.transcript) {
                self.props.stopListening();
                //REMOVE
                console.log(self.props.transcript);
                self.state.answer=self.props.transcript;
                self.interpretResult();
            }
            else {
                self.evaluateListening();
            }
        },3000);
    }

    micPressed = () => {
        this.setState((prevState) => ({visibleLabel: false}))
        this.props.startListening();
        this.evaluateListening();
    }

    render() {

        const { visibleLabel, input, showAnswer} = this.state
        const {transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props
        const MessageExampleIcon = () => (
            <Message>
                <Icon name='circle notched' loading />
                <Message.Content>
                    <Message.Header size='mini'>Listening</Message.Header>
                    <p>{transcript}</p>
                </Message.Content>
            </Message>
        )

        const mySpeech = new Speech()
        mySpeech.init({
            'volume': 1,
            'lang': 'en-GB',
            'rate': 1,
            'pitch': 1,
            'voice':'Google UK English Male',
            'splitSentences': true,
        })
        this.state.speech = mySpeech

        return (
            <div>
                <div style={{height:'100px', margin:'0 auto'}}>
                    <i aria-hidden="true" className={ showAnswer+" big user md circular inverted icon"}/>
                </div>
                <br/>
                <br/>
                <div>
                    <Button disabled={!visibleLabel} circular color='red' icon='microphone' size='massive' onClick={this.micPressed} />
                </div>
                <div>
                    <Transition visible={visibleLabel} animation='fade up' duration={500}>
                        <Label basic pointing style={{backgroundColor:'white'}}>
                            Press to interact
                        </Label>
                    </Transition>
                    { !visibleLabel && <br/> }
                </div>
                {
                    !visibleLabel && <MessageExampleIcon/>
                }
            </div>
        )
    }
}
const options = {
    autoStart: false
}
export default SpeechRecognition(options)(VoiceControl);