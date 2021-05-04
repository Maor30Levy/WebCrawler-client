import { processTree, checkInput, deletePreviousQuery, updateStatusBar } from './utils/functions.js';
import { Queue } from './utils/queue.js';

const urlElement = document.getElementById('url');
const maxLevelElement = document.getElementById('max-level');
const maxPagesElement = document.getElementById('max-pages');

urlElement.addEventListener('focus', () => {
    document.getElementById('url-validation-alert').className = 'none';
});
maxLevelElement.addEventListener('focus', () => {
    document.getElementById('level-validation-alert').className = 'none';
});
maxPagesElement.addEventListener('focus', () => {
    document.getElementById('pages-validation-alert').className = 'none';
});

const form = document.getElementById('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    deletePreviousQuery();
    try {
        const url = urlElement.value;
        const maxLevel = maxLevelElement.value;
        const maxPages = maxPagesElement.value;
        const validInput = await checkInput(url, parseInt(maxLevel), parseInt(maxPages));
        if (validInput) {
            const request = { url, maxLevel, maxPages };
            let result = await fetch('/server', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ route: 'newQuery', request })
            });
            if (!result.ok) {
                throw {
                    status: result.status,
                    message: result.statusText
                }
            }
            const q = new Queue();
            let tree = await result.json();
            if (tree.root) await processTree(tree, q);
            const stream = async () => {
                try {
                    result = await fetch('/server', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ route: 'stream', request })
                    });
                    if (!result.ok) {
                        throw {
                            status: result.status,
                            message: result.statusText
                        }
                    }
                    tree = await result.json();
                    if (tree.root) {
                        document.getElementById('status-bar').className = 'status_bar';
                        updateStatusBar(tree);
                        await processTree(tree, q);
                    }

                    if (!tree.completed) setTimeout(stream, 2000)

                } catch (err) {
                    console.log(err)
                }

            };
            if (!tree.completed) setTimeout(stream, 2000);
        }
    } catch (err) {
        console.log(err.message);
    }
});








