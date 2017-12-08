import sigma from 'sigma';
export class SigmaService {
    constructor() {
        this.s = new sigma('graph-container');
    }
    clear_graph() {
        //this gets rid of all the ndoes and edges
        this.s.graph.clear();
        this.s.refresh();
    };
    BuildHelloWorld() {
        // Let's first initialize sigma:
        this.clear_graph();
        //s = new sigma('graph-container');

        // Then, let's add some data to display:
        this.s.graph.addNode({
            // Main attributes:
            id: 'n0',
            label: 'Hello',
            // Display attributes:
            x: 0,
            y: 0,
            size: 1,
            color: '#f00'
        }).addNode({
            // Main attributes:
            id: 'n1',
            label: 'World !',
            // Display attributes:
            x: 1,
            y: 1,
            size: 1,
            color: '#00f'
        }).addEdge({
            id: 'e0',
            // Reference extremities:
            source: 'n0',
            target: 'n1'
        });

        // Finally, let's ask our sigma instance to refresh:
        this.s.refresh();
    }

    BuildBasic() {
        this.clear_graph();
        /**
       * This is a basic example on how to instantiate sigma. A random graph is
       * generated and stored in the "graph" variable, and then sigma is instantiated
       * directly with the graph.
       *
       * The simple instance of sigma is enough to make it render the graph on the on
       * the screen, since the graph is given directly to the constructor.
       */
        var i,
            N = 100,
            E = 500,
            g = {
                nodes: [],
                edges: []
            };

        // Generate a random graph:
        for (i = 0; i < N; i++)
            g.nodes.push({
                id: 'n' + i,
                label: 'Node ' + i,
                x: Math.random(),
                y: Math.random(),
                size: Math.random(),
                color: '#666'
            });

        for (i = 0; i < E; i++)
            g.edges.push({
                id: 'e' + i,
                source: 'n' + (Math.random() * N | 0),
                target: 'n' + (Math.random() * N | 0),
                size: Math.random(),
                color: '#ccc'
            });

        // Instantiate sigma:
        this.s = new sigma({
            graph: g,
            container: 'graph-container'
        });
    }

    BuildTree() {
        this.clear_graph();
        /**
       * This is a basic example on how to instantiate sigma. A random graph is
       * generated and stored in the "graph" variable, and then sigma is instantiated
       * directly with the graph.
       *
       * The simple instance of sigma is enough to make it render the graph on the on
       * the screen, since the graph is given directly to the constructor.
       */
        var i,
            N = 1000,
            E = 1000,
            g = {
                nodes: [],
                edges: []
            };

        // Generate a random graph:
        for (i = 0; i < N; i++)
            g.nodes.push({
                id: 'n' + i,
                label: 'Node ' + i,
                x: Math.random(),
                y: Math.random(),
                size: Math.random(),
                color: '#666'
            });

        for (i = 0; i < E; i++)
            g.edges.push({
                id: 'e' + i,
                source: 'n' + (Math.random() * N | 0),
                target: 'n' + (Math.random() * N | 0),
                size: Math.random(),
                color: '#ccc'
            });

        // Instantiate sigma:
        this.s = new sigma({
            graph: g,
            container: 'graph-container'
        });
    }
}