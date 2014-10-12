/**
 * Created by Administrator on 2014/8/27.
 */

define(['lib/d3'],function(d3){
    var zhaoyun = {
        type:"main",
        name:'zhaoyun',
        children : [
            {
                type: "category",
                name: "children",
                children: [
                    {
                        type: "children",
                        name: "zhaotong"
                    },
                    {
                        type : "children",
                        name : "zhaoguang"
                    }
                ]
            },
            {
                type: "category",
                name: "leader",
                children: [
                    {
                        type : "leader",
                        name : "liubei"
                    },
                    {
                        type : "leader",
                        name : "gongsunzan"
                    }
                ]
            },
            {
                type: "category",
                name: "enemy",
                children: [
                    {
                        type : "enemy",
                        name : "simayi"
                    }
                ]
            },
            {
                type: "category",
                name: "relative",
                children: [
                    {
                        type : "relative",
                        name : "xiahoulan"
                    }
                ]
            }
        ]
    };

    var liubei = {
        type:"main",
        name : "liubei",
        children : [
            {
                type : "category",
                name : "children",
                children : [
                    {
                        type : "children",
                        name : "liufeng"
                    },
                    {
                        type : "children",
                        name : "liushan"
                    }
                ]
            },
            {
                type: "category",
                name: "enemy",
                children: [
                    {
                        type : "enemy",
                        name : "simayi"
                    }
                ]
            }
        ]
    };

    var width = 300;
    var height = 300;
    var root;

    var
        g = document.getElementById('hero-links'),
        x = g.clientWidth,
        y =  g.clientHeight;

    window.onresize = updateWindow;
    function updateWindow(){
        x = g.clientWidth;
        y = g.clientHeight;

        svg.attr("width", x).attr("height", y);
        console.log('width is' + x + 'height is' + y);
    }

    var svg = d3.select("#hero-links").append("svg")
        .attr("width", x)
        .attr("height", y)
        .attr("preserveAspectRatio", "xMidYMid meet");

    var force = d3.layout.force()
        .linkDistance(50)
        .size([x, y])
        .on('tick', tick);



    var link = svg.selectAll(".link"),
        node = svg.selectAll("g.node"),
        circle = svg.selectAll('circle'),
        text = svg.selectAll('text');

//    d3.json("readme.json", function(json) {
//        root = json;
//        update();
//    });



    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.x, d.y]; });


    root = zhaoyun;
    update(false);
    function update(rebuild) {
        var nodes = flatten(root, rebuild),
            //because node itself has children property
            links = d3.layout.tree().links(nodes);

        // Restart the force layout.
        force
            .nodes(nodes)
            .links(links)
            .charge(-200)
            .start();

        // Update the links…
        link = link.data(links, function(d) { return d.target.id; });

        // Exit any old links.
        link.exit().remove();

        // Enter any new links.
        // direct line links
/*        link.enter().insert("line", ".node")
            .attr("class", "link")
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });*/
        //diagonal links
        link.enter()
            .insert('path','.node')//render the path first
            .attr("class", "link")
            .attr("d", diagonal);

        // Update the nodes…
        node = node.data(nodes, function(d) { return d.id; }).style("fill", color);

        // Exit any old nodes.
        node.exit().remove();

        var gnode = node.enter()
                    .append("g")
                    .attr("class", "node")
                    .on("dblclick", dblclick)
                    .call(force.drag().on("dragstart", dragstart));

        gnode.append('circle')
            .attr("cx", '0')
            .attr("cy", '0')
            .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 8.5; })
            .style("fill", color)
            .on("click", click);



        gnode.append("text")
            .attr("x", '10')
            .attr("y", '3')
            .text(function(d) { return d.name });
    }

    function tick() {
//        link.attr("x1", function(d) { return d.source.x; })
//            .attr("y1", function(d) { return d.source.y; })
//            .attr("x2", function(d) { return d.target.x; })
//            .attr("y2", function(d) { return d.target.y; });

        link.attr("d", diagonal);

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    }

    function dblclick(d) {
        d3.select(this).classed("hero-link-fixed", d.fixed = false);
    }

    function dragstart(d) {
        d3.select(this).classed("hero-link-fixed", d.fixed = true);
    }

// Color leaf nodes orange, and packages white or blue.
    function color(d) {
        return d._children ? "orange" : d.children ? "blue" : "green";
    }

// Toggle children on click.
    function click(d) {
        if (!d3.event.defaultPrevented) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(false);
        }

        if(d.type!== 'category' && d.type!=='main'){
//            d.children = liubei.children;
            var liubeiInZhaoyun = findHeroNode(zhaoyun, liubei.name);
            console.log(liubeiInZhaoyun);
            liubeiInZhaoyun['children'] = liubei.children;
            console.log('zhaoyun is ', zhaoyun);
            update(true);
        }
    }

    function findHeroNode(origin, expand, fn) {
        if(origin.hasOwnProperty('name')){
            if(origin.name === expand){
                if(fn){fn(origin)}
                console.log('found!', origin);
                return origin;
            }else{
                if(origin.hasOwnProperty('children')){
                    for(var i = 0; i < origin.children.length; i++){
                        var result = findHeroNode(origin.children[i],expand, fn);
                        if(result) return result;
                    }
                }
            }
        }



    }

// Returns a list of all nodes under the root.
    function flatten(root, rebuild) {
        var nodes = [], i = 0;

        function recurse(node) {
            if (node.children) node.children.forEach(recurse);
            if (!node.id || rebuild) node.id = ++i;
            nodes.push(node);
        }

        recurse(root);
//        console.log('nodes are' , nodes);
        return nodes;
    }

});

