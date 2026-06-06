import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-border bg-[oklch(0.1_0.02_270)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copy}
          className="h-7 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <Highlight code={code.trim()} language={language} theme={themes.vsDark}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className + " overflow-x-auto p-4 text-sm leading-relaxed"} style={{ ...style, background: "transparent" }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-8 text-muted-foreground/50 select-none text-xs">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}