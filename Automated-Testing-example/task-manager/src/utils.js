function validateTask(obj = {}, options = {}) {
  const errors = {};
  const title = obj.title;
  if (title === undefined || title === null) {
    if (!options.allowEmptyTitle) errors.title = 'Title is required';
  } else if (typeof title !== 'string' || title.trim().length === 0) {
    errors.title = 'Title must be a non-empty string';
  } else if (title.trim().length > 200) {
    errors.title = 'Title max length is 200';
  }

  if (obj.description && typeof obj.description !== 'string') {
    errors.description = 'Description must be a string';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

module.exports = { validateTask };
