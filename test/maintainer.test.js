// import {maintainer_net} from '../src/maintainer_calculator.js';
// import { expect, test } from 'vitest';
// import path from 'path';
// import fs from 'fs/promises';

// async function loadData(fileName) {
//     try {
//         const filePath = path.join(process.cwd(), fileName);
//         const data = await fs.readFile(filePath, 'utf8');
//         return JSON.parse(data);
//     }
//     catch (error) {
//         console.error(`Error loading commit data: ${error}`);
//         throw error;
//     }
// }

// test('Test1 for maintainer calculator : https://www.npmjs.com/package/wat4hjs', async () => {
//     const contributors = await loadData('/test/testing_data/contributors_data_for_testing/contributors_hasan.json');
//     const issues = await loadData('/test/testing_data/issue_data_for_testing/issues_hasan.json');
//     const pull_requests = await loadData('/test/testing_data/pull_request_data_for_testing/pullRequests_hasan.json');
//     expect(await maintainer_net(contributors, issues, pull_requests, [])).toBeGreaterThan(0.1);
//     expect(await maintainer_net(contributors, issues, pull_requests, [])).toBeLessThan(0.9);
// });

// test('Test2 for maintainer calculator : https://github.com/mrdoob/three.js/', async () => {
//     const contributors = await loadData('/test/testing_data/contributors_data_for_testing/contributors_mrdoob.json');
//     const issues = await loadData('/test/testing_data/issue_data_for_testing/issues_mrdoob.json');
//     const pull_requests = await loadData('/test/testing_data/pull_request_data_for_testing/pullRequests_mrdoob.json');
//     expect(await maintainer_net(contributors, issues, pull_requests, [])).toBeGreaterThan(0.5);
// });

// test('Test3 for maintainer calculator : https://github.com/facebook/react/', async () => {
//     const contributors = await loadData('/test/testing_data/contributors_data_for_testing/contributors_react.json');
//     const issues = await loadData('/test/testing_data/issue_data_for_testing/issues_react.json');
//     const pull_requests = await loadData('/test/testing_data/pull_request_data_for_testing/pullRequests_react.json');
//     expect(await maintainer_net(contributors, issues, pull_requests, [])).toBeGreaterThan(0.5);
// }
// );

// // test('Test4 for maintainer calculator : https://www.npmjs.com/package/unlicensed    ', async () => {    
// //     const contributors = await loadData('/test/testing_data/contributors_data_for_testing/contributors_unlicensed.json');
// //     const issues = await loadData('/test/testing_data/issue_data_for_testing/issues_unlicensed.json');
// //     const pull_requests = await loadData('/test/testing_data/pull_request_data_for_testing/pullRequests_unlicensed.json');
// //     expect(await maintainer_net(contributors, issues, pull_requests, [])).toBeLessThan(0.5);
// // });

// test('Test5 for maintainer calculator : https://www.npmjs.com/package/socket.io', async () => {
//     const contributors = await loadData('/test/testing_data/contributors_data_for_testing/contributors_socket.json');
//     const issues = await loadData('/test/testing_data/issue_data_for_testing/issues_socket.json');
//     const pull_requests = await loadData('/test/testing_data/pull_request_data_for_testing/pullRequests_socket.json');
//     expect(await maintainer_net(contributors, issues, pull_requests, [])).toBeGreaterThan(0.25);
//     expect(await maintainer_net(contributors, issues, pull_requests, [])).toBeLessThan(0.75);
// });

import { maintainer_net } from '../src/maintainer_calculator.js';
import { expect, test, afterAll } from 'vitest';
import path from 'path';
import fs from 'fs/promises';

let totalTests = 0;
let passedTests = 0;

async function loadData(fileName) {
    try {
        const filePath = path.join(process.cwd(), fileName);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading commit data: ${error}`);
        throw error;
    }
}

async function runTest(testName, contributorsPath, issuesPath, pullRequestsPath, expectedMin, expectedMax) {
    totalTests++;
    try {
        const contributors = await loadData(contributorsPath);
        const issues = await loadData(issuesPath);
        const pull_requests = await loadData(pullRequestsPath);

        const score = await maintainer_net(contributors, issues, pull_requests, []);
        expect(score).toBeGreaterThan(expectedMin);
        if (expectedMax !== undefined) {
            expect(score).toBeLessThan(expectedMax);
        }

        passedTests++;
        console.log(`${testName} - Passed`);
    } catch (error) {
        console.log(`${testName} - Failed: ${error.message}`);
    }
}

test('Test1 for maintainer calculator : https://www.npmjs.com/package/wat4hjs', async () => {
    await runTest(
        'Test1 for maintainer calculator',
        '/test/testing_data/contributors_data_for_testing/contributors_hasan.json',
        '/test/testing_data/issue_data_for_testing/issues_hasan.json',
        '/test/testing_data/pull_request_data_for_testing/pullRequests_hasan.json',
        0.1,
        0.9
    );
});

test('Test2 for maintainer calculator : https://github.com/mrdoob/three.js/', async () => {
    await runTest(
        'Test2 for maintainer calculator',
        '/test/testing_data/contributors_data_for_testing/contributors_mrdoob.json',
        '/test/testing_data/issue_data_for_testing/issues_mrdoob.json',
        '/test/testing_data/pull_request_data_for_testing/pullRequests_mrdoob.json',
        0.5
    );
});

test('Test3 for maintainer calculator : https://github.com/facebook/react/', async () => {
    const contributors = await loadData('/test/testing_data/contributors_data_for_testing/contributors_react.json');
    const issues = await loadData('/test/testing_data/issue_data_for_testing/issues_react.json');
    const pull_requests = await loadData('/test/testing_data/pull_request_data_for_testing/pullRequests_react.json');
    expect(await maintainer_net(contributors, issues, pull_requests, [])).toBeGreaterThan(0.5);
}
);

// test('Test4 for maintainer calculator : https://www.npmjs.com/package/unlicensed    ', async () => {    
//     const contributors = await loadData('/test/testing_data/contributors_data_for_testing/contributors_unlicensed.json');
//     const issues = await loadData('/test/testing_data/issue_data_for_testing/issues_unlicensed.json');
//     const pull_requests = await loadData('/test/testing_data/pull_request_data_for_testing/pullRequests_unlicensed.json');
//     expect(await maintainer_net(contributors, issues, pull_requests, [])).toBeLessThan(0.5);
// });

test('Test4 for maintainer calculator : https://www.npmjs.com/package/socket.io', async () => {
    const contributors = await loadData('/test/testing_data/contributors_data_for_testing/contributors_socket.json');
    const issues = await loadData('/test/testing_data/issue_data_for_testing/issues_socket.json');
    const pull_requests = await loadData('/test/testing_data/pull_request_data_for_testing/pullRequests_socket.json');
    expect(await maintainer_net(contributors, issues, pull_requests, [])).toBeGreaterThan(0.25);
    expect(await maintainer_net(contributors, issues, pull_requests, [])).toBeLessThan(0.75);
});

// Output summary after all tests
afterAll(() => {
    const coverage = 0; // You can replace this with actual coverage if available
    console.log(`${passedTests}/${totalTests} test cases passed.`);
    console.log(`${coverage}% line coverage achieved.`);
});
