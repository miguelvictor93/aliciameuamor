"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateQuestionAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WandSparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Gerando..." : <> <WandSparkles className="mr-2 h-4 w-4" /> Gerar Pergunta</>}
    </Button>
  );
}

export default function GenerateQuestionPage() {
  const initialState = { data: null, error: null };
  const [state, formAction] = useFormState(generateQuestionAction, initialState);

  return (
    <div className="min-h-svh bg-gradient-to-br from-princess-pink-light via-princess-pink to-princess-purple flex items-center justify-center p-4">
       <Button asChild variant="ghost" className="absolute top-4 left-4 text-brand-text hover:bg-white/30 hover:text-brand-text">
        <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Jogo
        </Link>
      </Button>
      <Card className="w-full max-w-2xl bg-button-bg/80 backdrop-blur-sm border-brand-gold">
        <CardHeader>
          <CardTitle className="font-headline text-brand-text flex items-center gap-2"><WandSparkles/> Ferramenta de Geração de Perguntas com IA</CardTitle>
          <CardDescription className="text-brand-text-secondary">
            Use o poder da IA para criar novas perguntas para o quiz "Qual Princesa É Essa?".
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hint" className="text-brand-text">Dica (Opcional)</Label>
              <Input
                id="hint"
                name="hint"
                placeholder="Ex: uma princesa da Pixar, uma vilã que virou heroína..."
                className="bg-white/80"
              />
            </div>
            {state.error && (
              <Alert variant="destructive">
                <AlertTitle>Erro na Geração</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
        {state.data && (
          <CardContent>
             <h3 className="font-headline text-lg text-brand-text mb-2">Pergunta Gerada:</h3>
            <pre className="p-4 bg-black/80 rounded-md text-white overflow-x-auto text-sm">
                <code>{JSON.stringify(state.data, null, 2)}</code>
            </pre>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
