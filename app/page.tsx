import Link from 'next/link';
import { Shell } from '@/components/Shell';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

const navLinks = [
  {
    href: '/hoje',
    label: 'Hoje',
    description: 'Check-in diário e estado atual',
    status: 'Em breve',
  },
  {
    href: '/historico',
    label: 'Histórico',
    description: 'Visualize sua jornada ao longo do tempo',
    status: 'Em breve',
  },
  {
    href: '/leituras',
    label: 'Leituras',
    description: 'Insights e análises do seu bem-estar',
    status: 'Em breve',
  },
  {
    href: '/protocolos',
    label: 'Protocolos',
    description: 'Tratamentos e acompanhamentos ativos',
    status: 'Em breve',
  },
  {
    href: '/anima',
    label: 'Ânima',
    description: 'Seu companheiro de jornada',
    status: 'Em breve',
  },
];

export default function HomePage() {
  return (
    <Shell>
      {/* Header Section */}
      <section className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-foreground">
          Bem-vindo ao Ânima
        </h1>
        <p className="text-muted-foreground">
          Acompanhamento contínuo de saúde mental e bem-estar
        </p>
      </section>

      <Separator className="my-6" />

      {/* Navigation Cards */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-medium text-foreground">Navegação</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="group">
              <Card className="h-full transition-colors hover:border-primary/50 hover:bg-accent/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium group-hover:text-primary">
                      {link.label}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {link.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {link.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator className="my-6" />

      {/* Components Demo Section */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-medium text-foreground">
          Componentes Base
        </h2>

        {/* Buttons */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Botões
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button>Primário</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destrutivo</Button>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Badges
          </h3>
          <div className="flex flex-wrap gap-3">
            <Badge>Padrão</Badge>
            <Badge variant="secondary">Secundário</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destrutivo</Badge>
          </div>
        </div>

        {/* Tooltip Demo */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Tooltip
          </h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Passe o mouse aqui</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tooltip funcionando</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Skeleton Demo */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            Skeleton
          </h3>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Status Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          MVP em construção — Prompt 02 concluído
        </p>
      </div>
    </Shell>
  );
}
