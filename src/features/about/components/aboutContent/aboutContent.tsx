export const AboutContent = () => {
    return (
      <div className="bg-neutral-4 rounded-lg shadow p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-1 mb-6">About Task Management</h1>
        
        <div className="space-y-6 text-neutral-1">
          <section>
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-neutral-2">
              This task management application helps teams organize and track their work efficiently. 
              Built with React and GraphQL, it provides a modern and intuitive interface for managing tasks.
            </p>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <ul className="list-disc pl-5 text-neutral-2 space-y-2">
              <li>Task organization with board and list views</li>
              <li>Personal task management</li>
              <li>Team collaboration tools</li>
              <li>Real-time updates</li>
              <li>Responsive design for all devices</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-xl font-semibold mb-3">Technology Stack</h2>
            <ul className="list-disc pl-5 text-neutral-2 space-y-2">
              <li>React with TypeScript</li>
              <li>Apollo GraphQL</li>
              <li>Tailwind CSS</li>
              <li>React Router</li>
            </ul>
          </section>
        </div>
      </div>
    );
  };
  
  export default AboutContent;