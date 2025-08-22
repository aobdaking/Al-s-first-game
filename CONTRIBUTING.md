# Contributing to Our Project

We welcome contributions to our project! To ensure a smooth development process, we have established the following branching strategy and workflow.

## Branching Strategy

Our repository uses two main branches:

-   **`Development`**: This is the primary branch for development. All new features and bug fixes should be based on this branch.
-   **`Production`**: This branch represents the stable, released version of our project.

## Development Workflow

1.  **Create a Feature Branch**: All new work, whether it's a feature or a bug fix, should be done on a dedicated feature branch. Create your feature branch from the `Development` branch.

    ```bash
    git checkout Development
    git pull origin Development
    git checkout -b your-feature-name
    ```

2.  **Commit Your Changes**: Make your changes on the feature branch and commit them with clear, descriptive messages.

3.  **Push Your Feature Branch**: Push your feature branch to the remote repository.

    ```bash
    git push origin your-feature-name
    ```

4.  **Create a Pull Request**: Once your feature is complete, create a pull request to merge your feature branch into the `Development` branch.

5.  **Code Review and Testing**: Your pull request will be reviewed by the team. Automated tests will also run to ensure the changes don't introduce any issues.

6.  **Merge to `Development`**: After approval and successful testing, your feature branch will be merged into the `Development` branch.

7.  **Merge to `Production`**: The `Development` branch will be periodically merged into the `Production` branch for new releases. This merge should only be done after the `Development` branch is thoroughly tested and stable.
