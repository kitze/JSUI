const cleanups = [
  {
    title: 'Remove non-existing projects',
    description: `Removes projects that don't exist on disk anymore`,
    id: 'remove-non-existing'
  },
  {
    title: 'Remove node_modules',
    description: `Cleans up disk space by removing all node_modules folders from all projects`,
    id: 'remove-node-modules'
  },
  {
    title: 'Add missing projects',
    description: 'Automatically adds missing projects from projects folder',
    id: 'add-missing-projects'
  }
];

export default cleanups;
