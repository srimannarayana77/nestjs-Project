export function sortObjectsByKey(objects: any[], sortBy: string = '_id', sortType: string = 'desc'): any[] {
    try {
      return objects.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
  
        if (sortType.toLowerCase() === 'desc') {
          return bValue.toString().localeCompare(aValue.toString());
        } else {
          return aValue.toString().localeCompare(bValue.toString());
        }
      });
    } catch (error) {
      console.error('Error sorting objects:', error);
      throw error;
    }
  }
  