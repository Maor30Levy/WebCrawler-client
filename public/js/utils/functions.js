import { Queue } from './queue.js';

export const parseNode = (node) => {
    const element = document.getElementById(node.id);
    element.innerText = node.title;
    const childrenList = document.createElement('ul');
    for (let child of node.children) {
        const childElement = document.createElement('li');
        childElement.id = child.id;
        childElement.innerText = child.title;
        childElement.className = 'on';

        childrenList.appendChild(childElement);
    }
    element.appendChild(childrenList);
    element.addEventListener('click', (event) => {
        const list = element.children[0].children;
        for (let child of list) {
            child.classList.toggle('on');
            child.classList.toggle('none');
        }
        event.stopPropagation();

    });

}

function markersHandler(id) {
    let workID = id;
    for (let i = 1; i < workID.length; i++) {
        if (workID[i] === '/') {
            const sub = workID.substring(0, i + 1);
            workID = workID.replace(sub, '$');
            const num = parseInt(sub.slice(1, sub.length - 1));
            return { num, id: workID }
        }
    }
}

export const getNodeByID = (id, tree) => {
    if (tree.root === null) return;
    let node = tree.root;
    if (node.children.length === 0) return node;
    let workID = id;
    for (let i = 0; i < workID.length - 1; i++) {
        let footer;
        if (workID[i + 1] === '/') {
            const result = markersHandler(workID.slice(i + 1));
            workID = workID.slice(0, i + 1) + result.id;
            footer = result.num;
        } else footer = workID[i + 1];
        node = node.children[footer];
    }
    return node;
}

export const checkInput = async (url, maxLevel, maxPages) => {
    const checkURL = await fetch('/check-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    });
    if (checkURL.status !== 200) {
        const alert = document.getElementById('url-validation-alert');
        alert.className = 'alert_on';
        return false;
    }
    if (!(maxLevel >= 1)) {
        const alert = document.getElementById('level-validation-alert');
        alert.className = 'alert_on';
        return false;
    }
    if (!(maxPages >= 1)) {
        const alert = document.getElementById('pages-validation-alert');
        alert.className = 'alert_on';
        return false;
    }
    return true;
};

export const deletePreviousQuery = () => {
    const root = document.getElementById('0');
    if (root.firstChild) {
        root.value = '';
        while (root.firstChild) {
            root.removeChild(root.lastChild);
        }
    }
    root.innerText = ''

};

export const processTree = async (tree, q) => {
    q.enqueue(tree.root, 1, tree.root.id);
    while (q.size > 0) {
        const node = getNodeByID(q.dequeue().id, tree);
        const nodeChildren = node.children;
        nodeChildren.forEach(child => {
            const node = document.getElementById(child.id)
            if (!node) q.enqueue(child.value, child.level, child.id);
        });
        parseNode(node);
    }
};

