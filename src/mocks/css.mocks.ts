export const basicStyleMock = `
  color: maroon;
  margin-left: 40px;
`;

export const layoutStylesMock = `
body { 
  font-family: 'Helvetica';
  text-align: center; 
}

.main-box { 
  display: flex;
  flex-wrap: wrap;
}
.one, .two, .three, .four { 
  flex-basis: 40%;
}
kbd {
  text-align: left; 
  display: inline-block;
  line-height: 1.5;
}

div { 
  border: 1px lightgrey dotted;
  margin: 30px;
}

h1, h2 { 
  color: purple;
}

li + li { 
  color: pink;
}

h3 ~ p { 
  font-size: 40px;
}

section div { 
  color: blue;
}
`;

export const tailwindThemeMock = `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
    font-family: Arial, Helvetica, sans-serif;
}

@layer base {
    :root {
        --background: 283 36% 98%;
        --foreground: 283 68% 2%;
        --muted: 283 13% 92%;
        --muted-foreground: 283 4% 37%;
        --popover: 283 36% 98%;
        --popover-foreground: 283 68% 2%;
        --card: 283 36% 97%;
        --card-foreground: 283 68% 1%;
        --border: 220 13% 91%;
        --input: 220 13% 91%;
        --primary: 283 93% 25%;
        --primary-foreground: 283 93% 85%;
        --secondary: 283 7% 90%;
        --secondary-foreground: 283 7% 30%;
        --accent: 283 15% 81%;
        --accent-foreground: 283 15% 21%;
        --destructive: 4 84% 36%;
        --destructive-foreground: 4 84% 96%;
        --ring: 283 93% 25%;
        --chart-1: 283 93% 25%;
        --chart-2: 283 7% 90%;
        --chart-3: 283 15% 81%;
        --chart-4: 283 7% 93%;
        --chart-5: 283 96% 25%;
        --radius: 0.5rem;
    }

    .dark {
        --background: 283 47% 2%;
        --foreground: 283 27% 98%;
        --muted: 283 13% 8%;
        --muted-foreground: 283 4% 63%;
        --popover: 283 47% 2%;
        --popover-foreground: 283 27% 98%;
        --card: 283 47% 3%;
        --card-foreground: 283 27% 99%;
        --border: 215 27.9% 16.9%;
        --input: 215 27.9% 16.9%;
        --primary: 283 93% 25%;
        --primary-foreground: 283 93% 85%;
        --secondary: 283 18% 12%;
        --secondary-foreground: 283 18% 72%;
        --accent: 283 25% 17%;
        --accent-foreground: 283 25% 77%;
        --destructive: 4 84% 49%;
        --destructive-foreground: 0 0% 100%;
        --ring: 283 93% 25%;
        --chart-1: 283 93% 25%;
        --chart-2: 283 18% 12%;
        --chart-3: 283 25% 17%;
        --chart-4: 283 18% 15%;
        --chart-5: 283 96% 25%;
    }
}

@layer base {
    * {
        @apply border-border;
    }
    body {
        @apply bg-background text-foreground;
    }
}

@layer components {
    .responsive-box {
        @apply mx-auto w-[min(60rem,90%)];
    }
}
`;
