import sigma from 'sigma';

window.dagre = require('dagre');
//couldn't find a way to load plugins via webpack so specifying them here
//note - the plugins folder was copied from a fork of sigma (linkurious) which contains the dagre plugin
require('./plugins/sigma.layouts.dagre/sigma.layout.dagre');
require('./plugins/sigma.parsers.json/sigma.parsers.json');

export class SigmaService {
    constructor() {
        this.s = new sigma('graph-container');
    }
    clear_graph() {
        //this gets rid of all the nodes and edges
        this.s.graph.clear();
        this.s.refresh();
    };
    BuildHelloWorld() {
        // Let's first initialize sigma:
        this.clear_graph();

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
            N = 10000,
            E = 10000,
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
        console.log(g);
        // Instantiate sigma:
        this.s = new sigma({
            graph: g,
            container: 'graph-container'
        });
    }

    BuildDagreTree() {
        this.clear_graph();

        var g = {
            nodes: [],
            edges: []
        };
        
        //it's... house of cards time!!
        var layers = 50;

        var nodeIndex = 0;
        for (let i = 1; i <= layers; i++){
            for (let j = 1; j <= i; j++) {
                nodeIndex++;
                g.nodes.push({
                    id: 'n' + nodeIndex,
                    label: 'Node ' + nodeIndex,
                    size: Math.random(),
                    color: '#666'
                });
                if (i !== layers) {
                    g.edges.push({
                        id: 'e' + (2 * nodeIndex - 1),
                        source: 'n' + nodeIndex,
                        target: 'n' + (nodeIndex + i),
                        size: Math.random(),
                        color: '#ccc'
                    });
                    g.edges.push({
                        id: 'e' + (2 * nodeIndex),
                        source: 'n' + nodeIndex,
                        target: 'n' + (nodeIndex + (i + 1)),
                        size: Math.random(),
                        color: '#ccc'
                    });
                }
            }
        }
        console.log(nodeIndex);

        // Instantiate sigma:
        this.s = new sigma({
            graph: g,
            container: 'graph-container'
        });

        var config = {
            rankdir: 'TB'
        };

        // Start the algorithm:
        var listener = sigma.layouts.dagre.configure(this.s, config);

        // Bind all events:
        listener.bind('start stop interpolate', function (event) {
            console.log(event.type);
        });

        sigma.layouts.dagre.start(this.s);
    }

    BuildCustomTree() {
        this.clear_graph();

        console.log('loading json...');

        //TODO: the below json takes tens of minutes to parse into an acceptable format, so we may want to do this beforehand
        //var example = require('../../data/example.json');

        // console.log('parsing example data...');

        // //TODO: important - calculate positions!
        // //ignoring positions for now
        // function NodeToGraph(node, acc) {
        //     acc = acc || {
        //         nodes: [],
        //         edges: []
        //     }
        //     acc.nodes.push({id: node.n});
        //     acc.edges = acc.edges.concat(_.map(node.c, c => {
        //         return {
        //             id: `${node.n}=>${node.c}`,
        //             source: node.n,
        //             target: c.n
        //         }
        //     }))
        //     _.each(node.c, c => NodeToGraph(c, acc));
        //     if(acc.nodes.length % 100 === 0)
        //         console.log(`node count: ${acc.nodes.length}`);
        //     return acc;
        // };
        // var graph = NodeToGraph(example);
        console.log(graph);
        console.log('loading graph...');
        // Instantiate sigma:
        this.s = new sigma({
            graph: graph,
            container: 'graph-container'
        });
     }
}