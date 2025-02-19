"use client";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { FlowChart } from "./FlowChart";

export default function AiGenerator2() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isCopyDisabled, setIsCopyDisabled] = useState(true);
  const [isGenerateChartDisabled, setIsGenerateChartDisabled] = useState(true);
  const [script, setScript] = useState<string>("");
  const [CopyButtonText, setCopyButtonText] = useState("Copy the Script");
  const generateScript = () => {
    setIsSubmitDisabled(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: input, id: "1" }),
    };
    fetch(
      "http://hvidlcpnwa01.phx.aexp.com:8088/generate/single",
      requestOptions,
    )
      .then((response) => response.json())
      .then((json) => enableButton(json.result))
      .catch((error) => console.error(error));
  };
  const enableButton = (result: any) => {
    console.log(result);
    result = result.replaceAll("|>", "|").replaceAll(">>", ">");
    const startIndex = result.toString().indexOf("graph LR");
    const endIndex = result.toString().lastIndexOf("```");
    setScript(result.toString().substring(startIndex, endIndex));
    setOutput(result);
    setIsSubmitDisabled(false);
    setIsCopyDisabled(false);
    setIsGenerateChartDisabled(false);
    setCopyButtonText("Copy the Script");
  };
  const handleCopyClick = async () => {
    try {
      await window.navigator.clipboard.writeText(script);
      setCopyButtonText("Copied to clipboard!");
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      setCopyButtonText("Retry Copying!!");
    }
  };

  return (
    <div className="flex justify-center py-4">
      <div className="w-9/12">
        <div className="h-full space-y-4 p-4">
          {/* Main content sections */}
          <div>
            <div className="w-full px-3 py-2 text-center text-xl">
              <p>Enter your script for and receive a graph</p>
            </div>
          </div>
          <div className="mb-6 grid-rows-4 gap-8 md:grid md:grid-cols-2 md:gap-4">
            <Card className="row-start-1 row-end-5 grid grid-rows-subgrid rounded-none bg-blue-50 p-4">
              <div className="row-start-1 row-end-2 grid grid-rows-subgrid">
                <div className="grid grid-flow-row gap-2">
                  <Label
                    htmlFor="script"
                    className="text-2xl font-medium leading-9 text-[#00175a]"
                  >
                    Input Script
                  </Label>
                  <span className="text-xs font-bold text-[#333]">
                    Examples
                  </span>
                  <span className="text-xs italic text-gray-500">
                    Create a graph report of the sales from last month
                  </span>
                </div>
              </div>
              <Textarea
                id="script"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your description here..."
                value={input}
                className="row-start-2 row-end-4 resize-none text-[#333]"
              />
              <div className="row-start-4 row-end-5 mt-4 grid grid-flow-col items-end justify-end gap-2">
                <Button variant="outline" onClick={() => setInput("")}>
                  Clear
                </Button>
                <Button
                  variant="default"
                  className="bg-[#006FCF] hover:bg-[#006FCF]/90"
                >
                  Submit
                </Button>
              </div>
            </Card>
            <Card className="row-start-1 row-end-5 grid grid-rows-subgrid rounded-none bg-blue-50 p-4">
              <div className="row-start-1 row-end-2">
                <Label className="text-2xl font-medium leading-9 text-[#00175a]">
                  Output
                </Label>
              </div>
              <div className="row-start-2 row-end-4 rounded-md border border-input bg-transparent p-3 text-sm text-muted-foreground">
                Output will appear here
              </div>
              <div className="row-start-4 row-end-6 mt-4 grid grid-flow-row items-end justify-end gap-2">
                <div className="grid grid-flow-col gap-2">
                  <Button
                    variant="outline"
                    className="bg-white text-[#5acdff]"
                    disabled={isCopyDisabled}
                    onClick={handleCopyClick}
                  >
                    {CopyButtonText}
                  </Button>
                </div>
                <FlowChart script={script} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
