export const AboutContent = () => {
  return (
    <div className="bg-neutral-4 rounded-lg shadow p-8 w-full mx-auto h-[90vh] overflow-y-auto">
      <h1 className="text-3xl font-bold text-neutral-1 mb-6">Final Challenge</h1>

      <div className="space-y-6 text-neutral-1">
        <section>
          <p className="text-neutral-2">
            The <strong>Final Challenge</strong> is a modern web application that highlights powerful features such as dynamic task tracking and flexible UI components. Built with TypeScript and React, this application emphasizes maintainability, scalability, and an excellent developer experience, incorporating Apollo Client and GraphQL to efficiently handle data fetching and state management.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Setup and Running</h2>
          <ol className="list-decimal pl-5 text-neutral-2 space-y-2">
            <li>Clone the repository: <code>git clone &lt;repo-url&gt;</code></li>
            <li>Navigate into the project directory: <code>cd final-challenge</code></li>
            <li>Install the required dependencies: <code>npm install</code></li>
            <li>Run the development server: <code>npm run dev</code></li>
            <li>To build the application for production: <code>npm run build</code></li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc pl-5 text-neutral-2 space-y-2">
            <li><strong>Task Management:</strong> Organize tasks across custom columns and boards. Features include task creation, task editing, task categorization, and dynamic board views.</li>
            <li><strong>Modular UI:</strong> Includes reusable, interactive UI components like cards, dropdowns, modals, buttons, and toolbars.</li>
            <li><strong>Responsive Layouts:</strong> Fully optimized for all device types, ensuring an exceptional user experience on both mobile and desktop screens.</li>
            <li><strong>Enhanced Navigation:</strong> Intuitive sidebar and header navigation for seamless access to different sections and features.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Technologies and Tools Used</h2>
          <ul className="list-disc pl-5 text-neutral-2 space-y-2">
            <li><strong>React:</strong> The core library used for building the user interface, offering a component-based architecture that simplifies the management of complex UIs.</li>
            <li><strong>Apollo Client & GraphQL:</strong> Utilized for data fetching and state management. GraphQL simplifies complex queries and reduces over-fetching by enabling clients to fetch only the necessary data.</li>
            <li><strong>TypeScript:</strong> Offers static type-checking to improve code reliability and developer productivity by minimizing runtime errors.</li>
            <li><strong>TailwindCSS:</strong> A utility-first CSS framework that ensures a flexible, customizable design for all user interfaces while speeding up the development process.</li>
            <li><strong>Vite:</strong> A modern and high-performance build tool that ensures fast and optimized builds for both development and production environments.</li>
            <li><strong>Zustand:</strong> Provides lightweight and simple state management across the app, making global state accessible without introducing complex boilerplate code.</li>
            <li><strong>React Router:</strong> A library for client-side routing to handle transitions between pages seamlessly, improving user navigation throughout the application.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutContent;
