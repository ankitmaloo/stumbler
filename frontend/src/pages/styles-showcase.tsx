import { useState, useEffect } from "react";
import { Check, Palette, Eye, Sun, Moon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useTheme } from "next-themes";

const ColorSwatch = ({ title, colors }: { title: string; colors: string[] }) => (
  <div className="mb-8 text-foreground">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {colors.map((color, index) => (
        <div key={index} className="text-center">
          <div 
            className={`w-full h-24 rounded-lg mb-2 transition-fast hover:scale-105 ${color}`}
            style={{ border: '1px solid rgba(0,0,0,0.1)' }}
          />
          <p className="text-xs font-mono text-muted-foreground">
            {color}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const GradientSwatch = ({ title, gradients }: { title: string; gradients: string[] }) => (
  <div className="mb-8 text-foreground">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {gradients.map((gradient, index) => (
        <div key={index} className="text-center">
          <div 
            className={`w-full h-24 rounded-lg mb-2 transition-fast hover:scale-105 ${gradient} relative overflow-hidden`}
            style={{ border: '1px solid rgba(0,0,0,0.1)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <p className="text-xs font-mono text-muted-foreground">
            {gradient}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const GlassMorphismShowcase = () => {
  const backgrounds = [
    'theme-primary',
    'theme-secondary', 
    'theme-tertiary',
    'theme-accent',
    'gradient-primary',
    'gradient-rainbow'
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Glassmorphism Effects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {backgrounds.map((bg, index) => (
          <div key={index} className={`relative h-32 rounded-lg overflow-hidden ${bg}`}>
            <div className="absolute inset-4 glass flex items-center justify-center rounded text-foreground">
              <span className="text-sm font-medium">Glass Effect</span>
            </div>
            <div className="absolute bottom-2 left-2 text-xs font-mono text-muted-foreground/70">
              {bg}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContrastTest = () => {
  const combinations = [
    { bg: 'theme-primary-card', label: 'Primary Card' },
    { bg: 'theme-secondary-card', label: 'Secondary Card' },
    { bg: 'theme-tertiary-card', label: 'Tertiary Card' },
    { bg: 'theme-accent-card', label: 'Accent Card' },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Card Contrast Testing</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {combinations.map((combo, index) => (
          <Card key={index} className={`${combo.bg} transition-fast hover:scale-[1.02]`}>
            <CardHeader>
              <CardTitle className="card-foreground">{combo.label}</CardTitle>
              <CardDescription className="text-muted-foreground">
                Background: {combo.bg}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed card-foreground">
                This is sample text to verify readability on card backgrounds. The quick brown fox jumps over the lazy dog. Modern UI design requires proper contrast between card backgrounds and text for accessibility compliance.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <button className="bg-primary/20 hover:bg-primary/30 text-primary-foreground px-4 py-2 rounded text-xs font-medium transition-fast">
                  Primary Action
                </button>
                <button className="border border-primary/30 text-primary-foreground px-4 py-2 rounded text-xs font-medium transition-fast">
                  Secondary Action
                </button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const GlowEffects = () => {
  const glowVariants = [
    { icon: 'glow-primary', label: 'Primary Glow', color: 'glow-primary' },
    { icon: 'glow-secondary', label: 'Secondary Glow', color: 'glow-secondary' },
    { icon: 'glow-tertiary', label: 'Tertiary Glow', color: 'glow-tertiary' },
    { icon: 'glow-accent', label: 'Accent Glow', color: 'glow-accent' }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Glow Effects</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {glowVariants.map((variant, index) => (
          <div key={index} className="text-center">
            <div className={`${variant.color} card w-24 h-24 mx-auto rounded-full mb-3 flex items-center justify-center transition-slow hover:scale-110`}>
              <div className="w-16 h-16 muted rounded-full flex items-center justify-center">
                <Eye className="w-8 h-8 foreground" />
              </div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{variant.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const TextGradients = () => {
  const textGradients = [
    { class: 'text-gradient-primary', label: 'Primary Gradient' },
    { class: 'text-gradient-rainbow', label: 'Rainbow Gradient' }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Text Gradients</h3>
      <div className="muted p-8 rounded-lg">
        {textGradients.map((gradient, index) => (
          <div key={index} className="mb-6">
            <h2 className={`${gradient.class} text-3xl font-bold mb-2`}>{gradient.label}</h2>
            <p className="text-muted-foreground text-lg">
              This showcases how text gradients appear on different backgrounds. The gradient should be smooth and readable.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const StylesShowcase = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = theme === "dark";

  const bgColors = [
    'theme-primary', 'theme-primary-light', 'theme-primary-dark',
    'theme-secondary', 'theme-secondary-light', 'theme-secondary-dark',
    'theme-tertiary', 'theme-tertiary-light', 'theme-tertiary-dark',
    'theme-accent', 'theme-accent-light', 'theme-accent-dark'
  ];

  const cardColors = [
    'theme-primary-card', 'theme-secondary-card', 
    'theme-tertiary-card', 'theme-accent-card'
  ];

  const gradients = [
    'gradient-primary', 'gradient-secondary', 
    'gradient-tertiary', 'gradient-accent', 'gradient-rainbow'
  ];

  const textColors = [
    'theme-primary-text', 'theme-secondary-text',
    'theme-tertiary-text', 'theme-accent-text'
  ];

  return (
    <div className="min-h-screen bg-background transition-medium">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12">
          <div className="glass mb-6 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 gradient-rainbow rounded-lg flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    Styles Showcase
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Test all color combinations and effects
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTheme(isDarkMode ? "light" : "dark")}
                  className="glass px-4 py-2 rounded-lg flex items-center space-x-2 transition-fast hover:scale-105"
                  disabled={!mounted}
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span className="text-sm font-medium text-muted-foreground">
                    {isDarkMode ? 'Light' : 'Dark'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Theme Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium text-muted-foreground">
                  {mounted ? (isDarkMode ? 'Dark Mode Active' : 'Light Mode Active') : 'Loading...'}
                </span>
              </div>
            </div>
            <div className="glass p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  CSS Variables Loaded
                </span>
              </div>
            </div>
            <div className="glass p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  Glass Effects Working
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Color Sections */}
        <section className="space-y-12">
          <ColorSwatch title="Background Colors" colors={bgColors} />
          <ColorSwatch title="Card Colors" colors={cardColors} />
          <ColorSwatch title="Text Colors" colors={textColors} />
          
          <GradientSwatch title="Gradients" gradients={gradients} />
          
          <GlassMorphismShowcase />
          
          <ContrastTest />
          
          <GlowEffects />
          
          <TextGradients />

          {/* Interactive Demo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="gradient-primary p-6 rounded-lg">
              <h4 className="text-white text-lg font-bold mb-2">Gradient Container</h4>
              <p className="text-white/90 text-sm">
                Content inside gradient containers should maintain good contrast.
              </p>
            </div>
            <Card className="theme-primary-card glass">
              <CardHeader>
                <CardTitle className="theme-primary-text">Card Container</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Card backgrounds with glass effects create depth and hierarchy using CSS variables.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`theme-primary-text text-sm leading-relaxed`}>
                  This demonstrates shadcn Card components with proper theming and CSS variables. The text adapts automatically based on dark/light mode and the card color theme.
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2">
                  <button className="bg-primary/20 hover:bg-primary/30 text-primary-foreground px-4 py-2 rounded text-xs font-medium transition-fast">
                    Primary Action
                  </button>
                  <button className="border border-primary/30 text-primary-foreground px-4 py-2 rounded text-xs font-medium transition-fast">
                    Secondary Action
                  </button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StylesShowcase;
