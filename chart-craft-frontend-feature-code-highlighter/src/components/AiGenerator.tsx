"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import mermaid from "mermaid"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react'
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader, DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {useDialog} from "@/hooks/useDialog";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function AiGenerator() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isCopyDisabled, setIsCopyDisabled] = useState(true);
  const [isGenerateChartDisabled, setIsGenerateChartDisabled] = useState(true);
  const [script, setScript] = useState<string>('');
  const [CopyButtonText, setCopyButtonText] = useState('Copy the Script');
  const generateScript = () => {
    setIsSubmitDisabled(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: input, id: '1' })
    };
    fetch('http://hvidlcpnwa01.phx.aexp.com:8088/generate/single', requestOptions)
        .then(response => response.json())
        .then(json => enableButton(json.result))
        .catch(error => console.error(error));

  }
  const enableButton = (result) => {
    console.log(result);
    result = result.replaceAll('|>', '|').replaceAll('>>', '>');
    const startIndex = result.toString().indexOf('graph LR');
    const endIndex = result.toString().lastIndexOf('```');
    setScript(result.toString().substring(startIndex , endIndex));
    setOutput(result);
    setIsSubmitDisabled(false);
    setIsCopyDisabled(false);
    setIsGenerateChartDisabled(false);
    setCopyButtonText('Copy the Script');
  }

  const handleCopyClick = async () => {
    try {
      await window.navigator.clipboard.writeText(script);
      setCopyButtonText('Copied to clipboard!');
    } catch (err) {
      console.error(
          "Unable to copy to clipboard.",
          err
      );
      setCopyButtonText('Retry Copying!!')
    }
  };
  return (
    <div className=" max-w-[1300px] w-11/12 p-4">
      <div className="border rounded-lg p-4 space-y-4 h-full bg-[#ecedee]">
        {/* Main content sections */}
        <div className="grid md:grid-cols-2 gap-4 mb-6 h-[calc(100%-120px)]">
          <Card className="p-4 flex flex-col">
            <div className="space-y-2 flex-grow">
              <Label htmlFor="script" className="font-bold">
                Input
              </Label>
              <div className="flex flex-col gap-2">
                <span className="text-gray-500 text-xs font-bold">Examples</span>
                <span className="text-gray-500 text-xs italic">Create a mermaid script to generate flow chart of todo app</span>
              </div>
              <Textarea id="script" placeholder="Enter your description here..." className="resize-none flex-grow"
                        rows = {10}
                        onChange={(e) => setInput(e.target.value)}
                        value={input}/>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="bg-white text-[#5acdff]" disabled={isSubmitDisabled} onClick={() => generateScript()}>
                Submit
              </Button>
              <Button variant="outline" className="bg-[#006FCF] text-white" onClick={() => setInput('')}>
                Clear
              </Button>
            </div>
          </Card>
          <Card className="p-4 flex flex-col">
            <div className="flex-grow">
              <Label className="font-bold">Output</Label>
              <div className="text-sm text-muted-foreground mt-2"><MarkdownRenderer markdown={output} /></div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="bg-white text-[#5acdff]" disabled={isCopyDisabled} onClick={handleCopyClick}>
                {CopyButtonText}
              </Button>
              <DialogComponent script={script} isGenerateChartDisabled={isGenerateChartDisabled}/>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function SplitStringComponent({ text }) {
  console.log("text:",text)
  const lines = text.split('\n');
  return (
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {lines.map((line, index) => (
             <div key={index} className={line.toString().includes('```') ? 'bg-gray-500' : ''}>
              {line.toString().includes('```') ? '' : line}
              <br />
            </div>
        ))}
      </div>
  );
}

class Mermaid extends React.Component<any, any> {
  componentDidMount() {
    mermaid.contentLoaded();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.chart !== this.props.chart) {
      document
          .getElementById("mermaid-chart")
          .removeAttribute("data-processed");
      mermaid.contentLoaded();
    }
  }

  render() {
    return (
        <div id="mermaid-chart" className="mermaid">
          {this.props.chart}
        </div>
    );
  }
}

export function DialogComponent({script, isGenerateChartDisabled}) {
  const {isOpen, onClose} = useDialog();
  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-[#006FCF] text-white" disabled={isGenerateChartDisabled}>
            Generate Chart
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-9/10">
          <DialogHeader>
            <DialogTitle>Flow chart</DialogTitle>
            <DialogDescription>
              <Mermaid chart={script}/>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
  )
}

