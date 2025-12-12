<template>
  <!-- 
    TEMPLATE SECTION:
    Similar to HTML in traditional web dev. This is what gets rendered to the browser.
    Think of it as the "UI layer" - defines WHAT to display.
    
    In Vue, we use special directives (v-for, v-if, etc.) to make HTML dynamic.
    These are like control structures in C++ but for the DOM (Document Object Model).
  -->
  <div>
    <!-- 
      HERO SECTION 
      - The main "landing" area users see first
      - Uses a minimalist white background instead of gradients
      - py-20 = padding-top and padding-bottom of 5rem (80px)
      - md:py-32 = on medium screens and up, use 8rem (128px) padding
      - These are Tailwind CSS utility classes (like inline styles but better)
    -->
    <section class="bg-white py-20 md:py-32 border-b border-gray-100">
      <!-- 
        CONTAINER:
        - Centers content and adds horizontal padding
        - mx-auto = margin left/right auto (centers the div)
        - px-4 = padding left/right of 1rem (16px)
        - max-w-6xl = maximum width of 72rem (1152px)
      -->
      <div class="container mx-auto px-4 max-w-6xl">
        <!-- 
          GRID LAYOUT:
          - Similar to a 2D array layout system
          - grid-cols-1 = 1 column on mobile (like a single column array)
          - md:grid-cols-2 = 2 columns on medium+ screens (like a 2-column array)
          - gap-12 = space between grid items (3rem/48px)
          - items-center = vertically center items (like vertical alignment)
        -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- 
            LEFT COLUMN: Text Content
            - This div takes up 1 grid cell
          -->
          <div>
            <!-- 
              H1 HEADING:
              - text-4xl = font-size: 2.25rem (36px) on mobile
              - md:text-6xl = font-size: 3.75rem (60px) on medium+ screens
              - font-bold = font-weight: 700 (bold)
              - text-gray-900 = very dark gray (almost black) - minimalist choice
              - mb-6 = margin-bottom: 1.5rem (24px)
            -->
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              [Your Name]
            </h1>
            
            <!-- 
              SUBTITLE:
              - text-xl = font-size: 1.25rem (20px)
              - md:text-2xl = font-size: 1.5rem (24px) on medium+ screens
              - text-gray-600 = medium gray for hierarchy (less emphasis than title)
              - mb-4 = margin-bottom: 1rem (16px)
            -->
            <p class="text-xl md:text-2xl text-gray-600 mb-4">
              Professional Administrative Manager
            </p>
            
            <!-- 
              DESCRIPTION PARAGRAPH:
              - text-lg = slightly larger text (1.125rem/18px)
              - leading-relaxed = line-height: 1.625 (more space between lines)
              - mb-8 = margin-bottom: 2rem (32px) - creates breathing room
            -->
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              [Brief tagline about your expertise - e.g., "Streamlining operations and empowering teams to achieve excellence through strategic administrative leadership"]
            </p>
            
            <!-- 
              BUTTON CONTAINER:
              - flex = flexbox layout (like a dynamic array that auto-arranges)
              - flex-wrap = allow items to wrap to next line if needed
              - gap-4 = space between flex items (1rem/16px)
              
              UButton is a Nuxt UI component (pre-built, reusable button)
              - to="/contact" = creates a router link (navigation without page reload)
              - color="gray" = uses gray color scheme (minimalist)
              - size="lg" = large size variant
              - icon = adds an icon from heroicons library
            -->
            <div class="flex flex-wrap gap-4">
              <UButton 
                to="#contact" 
                color="gray" 
                size="lg"
                icon="i-heroicons-envelope"
                class="outline-solid rounded-md p-2"
              >
                Get in Touch
              </UButton>
              
              <!-- 
                variant="outline" = hollow button with border (minimalist design)
                This creates visual hierarchy: solid vs outline
              -->
              <UButton 
                to="#services" 
                color="gray" 
                variant="outline"
                size="lg"
                icon="i-heroicons-briefcase"
                class="outline-solid rounded-md p-2"
              >
                View Services
              </UButton>
            </div>
          </div>
          
          <!-- 
            RIGHT COLUMN: Profile Image Placeholder
            - flex justify-center = center content horizontally using flexbox
          -->
          <div class="flex justify-center">
            <!-- 
              IMAGE PLACEHOLDER:
              - w-64 h-64 = width and height of 16rem (256px) on mobile
              - md:w-96 md:h-96 = 24rem (384px) on medium+ screens
              - bg-gray-100 = very light gray (minimalist placeholder)
              - rounded-full = border-radius: 9999px (creates perfect circle)
              - flex items-center justify-center = center the icon inside
              - border-4 border-gray-200 = thin border for definition
            -->
            <div class="w-64 h-64 md:w-96 md:h-96 bg-gray-100 rounded-full flex items-center justify-center border-4 border-gray-200">
              <!-- 
                UIcon = Nuxt UI icon component
                - name = icon identifier from heroicons
                - w-32 h-32 = icon size (8rem/128px)
                - text-gray-300 = light gray icon (subtle)
              -->
              <!-- <UIcon name="i-heroicons-user-circle" class="w-32 h-32 text-gray-300" /> -->
                <!-- "mx-auto block h24 rounded-full sm:mx-0 sm:shrink-0" -->
                <img class="w-64 h-64 md:w-96 md:h-96 rounded-full" src="~/assets/images/princesse.jpg" alt="Profile picture">
              <!-- 
                sr-only = "screen reader only"
                - Hides element visually but keeps it for accessibility
                - Like a comment for screen readers (helps blind users)
              -->
              <span class="sr-only">Profile photo</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 
      KEY STATS SECTION 
      - Shows important numbers/metrics
      - bg-gray-50 = very subtle gray background (almost white - minimalist)
      - Separated from hero with different background for visual grouping
    -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 max-w-6xl">
        <!-- 
          STATS GRID:
          - grid-cols-2 = 2 columns on mobile (2x2 grid)
          - md:grid-cols-4 = 4 columns on medium+ screens (1x4 grid)
          - This is responsive design - adapts to screen size
          
          v-for = Vue's loop directive (like for loop in C++)
          - Iterates over 'stats' array (defined in <script> section below)
          - :key = unique identifier for each item (required by Vue for efficiency)
          - Similar to: for(auto& stat : stats) in C++
        -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center" v-for="stat in stats" :key="stat.label">
            <!-- 
              STAT VALUE:
              - text-4xl = large font size
              - font-bold = bold weight
              - text-gray-900 = dark gray (not using color for minimalism)
              - mb-2 = small margin below
              
              {{ stat.value }} = Vue interpolation syntax
              - Inserts JavaScript variable value into HTML
              - Like cout << stat.value in C++, but for HTML
            -->
            <div class="text-4xl font-bold text-gray-900 mb-2">
              {{ stat.value }}
            </div>
            
            <!-- STAT LABEL: description of the number -->
            <div class="text-gray-600 font-medium">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 
      ABOUT PREVIEW SECTION 
      - Gives a quick intro before the full "About" page
      - bg-white = white background (alternating with gray-50)
    -->
    <section class="py-20 bg-white border-b border-gray-100">
      <div class="container mx-auto px-4 max-w-6xl">
        <!-- 
          SECTION HEADER:
          - max-w-3xl = max width of 48rem (768px)
          - mx-auto = center horizontally
          - text-center = center text alignment
          - mb-12 = margin bottom (spacing before content)
        -->
        <div class="max-w-3xl mx-auto text-center mb-12">
          <!-- 
            SECTION TITLE:
            - Consistent sizing across sections
            - mb-4 = space below heading
          -->
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          
          <!-- SECTION DESCRIPTION -->
          <p class="text-lg text-gray-600 leading-relaxed">
            [Brief introduction paragraph about your background, experience, and approach to administrative management. Highlight what makes you unique and the value you bring to organizations.]
          </p>
        </div>
        
        <!-- 
          STRENGTHS GRID:
          - Shows 3 key strengths
          - grid-cols-1 = stack vertically on mobile
          - md:grid-cols-3 = 3 columns on medium+ screens
          - max-w-5xl = constrain width (80rem/1280px)
        -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- 
            STRENGTH CARD:
            - v-for loops through strengths array
            - Each card has: icon, title, description
          -->
          <div v-for="strength in strengths" :key="strength.title" class="text-center">
            <!-- 
              ICON CONTAINER:
              - bg-gray-100 = light gray circle (minimalist - no bright colors)
              - w-16 h-16 = 4rem x 4rem (64px x 64px) square
              - rounded-full = makes it a circle
              - flex items-center justify-center = centers icon
              - mx-auto = centers the circle itself
              - mb-4 = space below
              
              :name = v-bind:name (Vue's binding syntax)
              - Dynamically sets the 'name' attribute
              - strength.icon contains the icon identifier string
            -->
            <div class="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon :name="strength.icon" class="w-8 h-8 text-gray-700" />
            </div>
            
            <!-- STRENGTH TITLE -->
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ strength.title }}
            </h3>
            
            <!-- STRENGTH DESCRIPTION -->
            <p class="text-gray-600 leading-relaxed">
              {{ strength.description }}
            </p>
          </div>
        </div>

        <!-- 
          CALL-TO-ACTION BUTTON:
          - Encourages user to visit the About page
          - mt-12 = margin-top (space from content above)
          - trailing-icon = icon appears after text (on the right)
        -->
        <div class="text-center mt-12">
          <UButton 
            to="/about" 
            color="gray" 
            size="lg"
            variant="outline"
            trailing-icon="i-heroicons-arrow-right"
          >
            Learn More About Me
          </UButton>
        </div>
      </div>
    </section>

    <!-- 
      SERVICES SECTION 
      - Shows available services in a grid
      - bg-gray-50 = alternating background color
    -->
    <section class="py-20 bg-gray-50" id="services">
      <div class="container mx-auto px-4 max-w-6xl">
        <!-- SECTION HEADER -->
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Services
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            [Brief description of your service philosophy and how you help organizations]
          </p>
        </div>

        <!-- 
          SERVICES GRID:
          - grid-cols-1 = 1 column mobile (stacked)
          - md:grid-cols-2 = 2 columns on tablets
          - lg:grid-cols-3 = 3 columns on large screens
          - Responsive 3-tier layout
          
          UCard = Nuxt UI card component (container with styling)
          - Provides consistent spacing, borders, shadows
          - hover:shadow-md = shadow appears on mouse hover
          - transition-shadow = smooth animation for shadow
          - border border-gray-200 = thin gray border (minimalist)
        -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <UCard 
            v-for="service in services" 
            :key="service.title" 
            class="hover:shadow-md transition-shadow border border-gray-200"
          >
            <!-- 
              CARD HEADER SLOT:
              - <template #header> is a Vue "named slot"
              - Allows us to customize the header area of UCard
              - Think of it like passing a custom section to a function
            -->
            <template #header>
              <div class="flex items-center gap-3">
                <!-- 
                  SERVICE ICON CONTAINER:
                  - bg-gray-100 = light gray background
                  - p-3 = padding all sides (0.75rem/12px)
                  - rounded-lg = rounded corners (0.5rem/8px radius)
                -->
                <div class="bg-gray-100 p-3 rounded-lg">
                  <UIcon :name="service.icon" class="w-6 h-6 text-gray-700" />
                </div>
                
                <!-- SERVICE TITLE -->
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ service.title }}
                </h3>
              </div>
            </template>
            
            <!-- 
              CARD BODY (default slot):
              - This is the main content area of the card
              - Contains the service description
            -->
            <p class="text-gray-600 leading-relaxed">
              {{ service.description }}
            </p>
          </UCard>
        </div>

        <!-- SERVICES CTA BUTTON -->
        <div class="text-center mt-12">
          <UButton 
            to="/services" 
            color="gray" 
            size="lg"
            trailing-icon="i-heroicons-arrow-right"
          >
            View All Services
          </UButton>
        </div>
      </div>
    </section>

    <!-- 
      TESTIMONIALS SECTION 
      - Shows client reviews/feedback
      - Social proof to build trust
    -->
    <!-- <section class="py-20 bg-white border-b border-gray-100">
      <div class="container mx-auto px-4 max-w-6xl"> -->
        <!-- SECTION HEADER -->
        <!-- <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Clients Say
          </h2>
          <p class="text-lg text-gray-600">
            [Brief statement about client satisfaction]
          </p>
        </div> -->

        <!-- 
          TESTIMONIALS GRID:
          - Same responsive pattern as services
          - Each testimonial is a card with quote, author, role
        -->
        <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <UCard 
            v-for="testimonial in testimonials" 
            :key="testimonial.author"
            class="border border-gray-200"
          > -->
            <!-- 
              CARD CONTENT:
              - space-y-4 = adds vertical spacing between child elements
              - Equivalent to setting margin-bottom on each child
            -->
            <!-- <div class="space-y-4"> -->
              <!-- 
                STAR RATING:
                - Shows 5 stars
                - v-for with number creates a loop from 1 to 5
                - In C++: for(int i = 1; i <= 5; i++)
                - text-gray-400 = light gray stars (minimalist, not yellow)
              -->
              <!-- <div class="flex text-gray-400">
                <UIcon 
                  v-for="i in 5" 
                  :key="i" 
                  name="i-heroicons-star-solid" 
                  class="w-5 h-5" 
                />
              </div> -->
              
              <!-- 
                TESTIMONIAL TEXT:
                - italic = slanted text (quotes are typically italicized)
                - Wrapped in quotes to indicate it's a direct quote
              -->
              <!-- <p class="text-gray-700 italic leading-relaxed">
                "{{ testimonial.text }}"
              </p> -->
              
              <!-- 
                AUTHOR INFO:
                - border-t = top border to separate from quote
                - pt-4 = padding-top (space after border)
              -->
              <!-- <div class="border-t border-gray-200 pt-4">
                <p class="font-semibold text-gray-900">
                  {{ testimonial.author }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ testimonial.role }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section> -->

    <!--
        CONTACT FORM
    -->
    <section id="contact" class="py-20 bg-gray-100 border-b border-gray-100">
        <div class="container mx-auto px-4 max-w-6xl">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <ContactForm></ContactForm>
            </div>
            <!-- <div class="grid grid-cols-1 gap-12 items-center rounded-1000 border-none">
		    	<UButton type="submit" class="p-4 bg-green-100">
			    	Submit
			    </UButton>
	    	</div> -->
        </div>
    </section>

    <footer class="py-20 bg-gray-900 text-white">
        <div class="container mx-auto px-4 text-center max-w-4xl">
            <div class="grid grid-cols-2">
                <div id="site-map" class="grid grid-cols-1">
                    <p>About Me</p>
                    <p>Services</p>
                    <p>Contact</p>
                </div>
                <div id="networks" class="grid grid-cols-1">
                    <p>Facebook</p>
                    <p>Instagram</p>
                </div>
            </div>
            <div class="copyright text-center my-8">
                <p>Copyright 2157-3410</p>
            </div>
        </div>
    </footer>
  </div>
</template>

<script setup>
/* 
  SCRIPT SECTION (COMPOSITION API):
  This is where the JavaScript logic lives. Think of it as your "main()" function.
  
  Vue 3 uses the Composition API (setup() function style).
  It's more similar to functional programming than class-based (Vue 2).
  
  Key concepts:
  - No need to return values - they're automatically available in template
  - Use const for variables (like const in C++)
  - Use ref() or reactive() for state that can change (mutable variables)
*/

// ============================================================================
// SEO (Search Engine Optimization)
// ============================================================================
/*
  useHead() is a Nuxt composable (reusable function).
  - Composables are functions that start with "use"
  - They're like utility functions but with special framework powers
  
  This sets the page <title> and <meta> tags for SEO.
  Search engines read this to understand and rank your page.
*/
useHead({
  title: 'Home | Professional Administrative Manager',
  meta: [
    { 
      name: 'description', 
      content: 'Professional administrative management services. Expert in operations, team coordination, and business efficiency.' 
    }
  ]
})

// ============================================================================
// DATA STRUCTURES
// ============================================================================
/*
  These are your data sources - like arrays/structs in C++.
  
  const = immutable reference (pointer can't change)
  - The array reference is constant
  - But you could mutate array contents if needed
  
  Similar to: const vector<Stat> stats in C++
*/

// ----------------------------------------------------------------------------
// STATS ARRAY
// ----------------------------------------------------------------------------
/*
  Array of objects - each object has { value, label }
  Like: struct Stat { string value; string label; }; vector<Stat> stats;
  
  These appear in the stats section (Years Experience, Projects, etc.)
*/
const stats = [
  { value: '[X]+', label: 'Years Experience' },  // Object literal syntax
  { value: '[X]+', label: 'Projects Completed' },
  { value: '[X]+', label: 'Happy Clients' },
  { value: '[X]%', label: 'Success Rate' }
]

// ----------------------------------------------------------------------------
// STRENGTHS ARRAY
// ----------------------------------------------------------------------------
/*
  Array of strength objects - each has icon, title, description
  
  icon: string identifier for heroicons library
  - 'i-heroicons-chart-bar' references a specific icon
  - The library loads the actual SVG icon
*/
const strengths = [
  {
    icon: 'i-heroicons-chart-bar',
    title: 'Strategic Planning',
    description: '[Description of your strategic planning capabilities]'
  },
  {
    icon: 'i-heroicons-users',
    title: 'Team Leadership',
    description: '[Description of your team leadership approach]'
  },
  {
    icon: 'i-heroicons-cog',
    title: 'Process Optimization',
    description: '[Description of your process optimization expertise]'
  }
]

// ----------------------------------------------------------------------------
// SERVICES ARRAY
// ----------------------------------------------------------------------------
/*
  Array of service offerings
  Each service has: icon, title, description
  
  These populate the service cards in the grid
*/
const services = [
  {
    icon: 'i-heroicons-clipboard-document-list',
    title: 'Operations Management',
    description: '[Brief description of operations management services]'
  },
  {
    icon: 'i-heroicons-user-group',
    title: 'Team Coordination',
    description: '[Brief description of team coordination services]'
  },
  {
    icon: 'i-heroicons-document-text',
    title: 'Documentation & Compliance',
    description: '[Brief description of documentation services]'
  },
  {
    icon: 'i-heroicons-calendar',
    title: 'Scheduling & Planning',
    description: '[Brief description of scheduling services]'
  },
  {
    icon: 'i-heroicons-chart-pie',
    title: 'Budget Management',
    description: '[Brief description of budget management services]'
  },
  {
    icon: 'i-heroicons-light-bulb',
    title: 'Process Improvement',
    description: '[Brief description of process improvement services]'
  }
]

// ----------------------------------------------------------------------------
// TESTIMONIALS ARRAY
// ----------------------------------------------------------------------------
/*
  Array of client testimonials
  Each has: text (the quote), author (name), role (position/company)
  
  Social proof to build trust with potential clients
*/
const testimonials = [
  {
    text: '[Testimonial text from a satisfied client about your work and impact]',
    author: '[Client Name]',
    role: '[Position, Company]'
  },
  {
    text: '[Another testimonial highlighting specific achievements or qualities]',
    author: '[Client Name]',
    role: '[Position, Company]'
  },
  {
    text: '[Third testimonial emphasizing results and professionalism]',
    author: '[Client Name]',
    role: '[Position, Company]'
  }
]

/*
  IMPORTANT NOTES FOR C++ DEVELOPERS:
  
  1. NO SEMICOLONS NEEDED (usually):
     - JavaScript has automatic semicolon insertion
     - Most modern style guides omit them
  
  2. NO TYPE DECLARATIONS:
     - JavaScript is dynamically typed (like Python)
     - TypeScript adds types if you need them
  
  3. OBJECTS USE : NOT =
     - { key: value } not { key = value }
     - Similar to JSON format
  
  4. STRING LITERALS:
     - Can use 'single', "double", or `backticks`
     - Backticks allow ${variable} interpolation
  
  5. ARRAYS ARE DYNAMIC:
     - No fixed size like C++ arrays
     - Can grow/shrink automatically (like std::vector)
  
  6. THIS IS ALL CLIENT-SIDE:
     - Runs in the browser, not on a server
     - Like JavaScript in a <script> tag
     - Nuxt can pre-render it to HTML for speed
*/
</script>

<style scoped>
/*
  STYLE SECTION (CSS):
  
  "scoped" means these styles ONLY apply to this component.
  - Won't leak to other components
  - Like having private member styles in C++
  
  However, we're using Tailwind CSS (utility classes in template),
  so we rarely need custom CSS here.
  
  You could add custom styles if needed:
  
  .custom-class {
    property: value;
  }
  
  But Tailwind handles 95% of styling needs with utility classes.
*/
</style>

<!--
  ============================================================================
  ARCHITECTURE OVERVIEW (for C++ developers):
  ============================================================================
  
  1. COMPONENT STRUCTURE:
     - <template>: The view (what user sees) - like rendering code
     - <script>: The logic (data and functions) - like your class/functions
     - <style>: The styling (how it looks) - like themes/colors
  
  2. DATA FLOW:
     - Data defined in <script> (arrays/objects)
     - Referenced in <template> with {{ }} or v-bind
     - Changes to data automatically update the view (reactive)
  
  3. REACTIVITY:
     - Vue tracks data changes and updates DOM automatically
     - Like having automatic observers on variables
     - No manual DOM manipulation needed (unlike vanilla JavaScript)
  
  4. COMPONENTS:
     - UButton, UCard, UIcon are imported components
     - Like using library classes in C++
     - They encapsulate behavior and styling
  
  5. DIRECTIVES:
     - v-for: Loop directive (like for loops)
     - v-if: Conditional rendering (like if statements)
     - v-bind or :: Bind data to attributes (dynamic attributes)
     - @: Event handler shorthand (v-on:click → @click)
  
  6. ROUTING:
     - <NuxtLink to="/path"> creates links
     - Changes URL without page reload (SPA - Single Page Application)
     - Like switching between views in a desktop app
  
  7. BUILD PROCESS:
     - Nuxt compiles this .vue file into optimized JavaScript
     - Tailwind processes utility classes into minimal CSS
     - Result: fast, small bundle for the browser
     
  8. COMPARISON TO C++:
     ┌─────────────────┬──────────────────────────┐
     │ C++ Concept     │ Vue/Web Equivalent       │
     ├─────────────────┼──────────────────────────┤
     │ struct/class    │ JavaScript object {}     │
     │ vector<T>       │ Array []                 │
     │ for loop        │ v-for directive          │
     │ if statement    │ v-if directive           │
     │ cout << x       │ {{ x }} interpolation    │
     │ function        │ const func = () => {}    │
     │ member variable │ const variable = value   │
     │ include library │ import from 'library'    │
     │ pointer         │ ref() (reactive)         │
     │ reference       │ const (immutable ref)    │
     └─────────────────┴──────────────────────────┘
-->