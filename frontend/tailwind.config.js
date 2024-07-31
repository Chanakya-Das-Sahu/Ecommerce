/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    screens: {
      range:{'min':'0px' , 'max':'730px' },
      filter:'730px',
      res:'460px',
      ch:'580px',
      xs:'476px',
      sm: '476px', // Adjust breakpoint values here
      md: '476px',
      // ... other breakpoints
    }
  },
  plugins: [],
}