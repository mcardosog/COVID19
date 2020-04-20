import React, {Component} from 'react';
import SpeechRecognition from "react-speech-recognition";
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Speech from 'speak-tts';
import {Button, Icon, Label, Transition, Message, Divider} from 'semantic-ui-react';

class VoiceControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "" ,
            visibleLabel: true,
            input: '',
            speech: new Speech(),
            showAnswer:'grey',
            answer:' ',
            loadingAnswer: false
        };
    }

    callAPI() {
        this.setState({
            loadingAnswer:true,
            visibleLabel:true
        });
        const transcript = this.props.transcript;
        fetch("http://localhost:9000/testAPI/"+transcript)
            .then(res => res.text())
            .then(res => {
                this.setState({ apiResponse: res });
                this.setState({answer: res});
                this.interpretResult();
            });
    }

    componentWillMount() {

    }

    interpretResult = () => {
        if(this.state.answer == null || this.state.answer === '') {
            this.setState({
                visibleLabel:true,
                showAnswer: 'grey',
                loadingAnswer:false
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
                        showAnswer: 'grey',
                        loadingAnswer:false
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
                self.setState({answer: self.props.transcript});
                self.callAPI();
            }
            else {
                self.evaluateListening();
            }
        },3000);
    }

    micPressed = () => {
        this.setState({visibleLabel: false});
        this.props.startListening();
        this.evaluateListening();
    }

    render() {
        const { visibleLabel, input, showAnswer, loadingAnswer} = this.state
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

        this.state.speech.init({
            'volume': 1,
            'lang': 'en-GB',
            'rate': 1,
            'pitch': 1,
            'voice':'Google UK English Male',
            'splitSentences': true,
        })

        return (
            <div>
                <div style={{height:'100px', margin:'0 auto'}}>
                    <i aria-hidden="true" className={ showAnswer+" big user md circular inverted icon"}/>
                </div>
                <br/>
                <div style={{height:'30px', margin:'0 auto'}}>
                    { loadingAnswer && <i aria-hidden="true" className="spinner loading icon"></i> }
                </div>
                <br/>
                <br/>
                <div>
                    <Button disabled={!visibleLabel ^ loadingAnswer} circular color='red' icon='microphone' size='massive' onClick={()=>this.micPressed()} />
                </div>
                <div>
                    <Transition visible={visibleLabel && !loadingAnswer} animation='fade up' duration={500}>
                        <Label basic pointing style={{backgroundColor:'white'}}>
                            Press to interact
                        </Label>
                    </Transition>
                    { !visibleLabel && <br/> }
                </div>
                {
                    !visibleLabel &&  <MessageExampleIcon/>
                }
            </div>
        )
    }
}
const options = {
    autoStart: false
}
export default SpeechRecognition(options)(VoiceControl);