#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting cleanup of Nuxt projects...${NC}\n"

# Function to clean a directory
clean_directory() {
    local project_path=$1
    local project_name=$2
    
    echo -e "${YELLOW}Cleaning ${project_name}...${NC}"
    
    if [ -d "$project_path" ]; then
        cd "$project_path" || exit
        
        # Remove .nuxt
        if [ -d ".nuxt" ]; then
            echo -e "  ${RED}Removing .nuxt${NC}"
            rm -rf .nuxt
        fi
        
        # Remove node_modules
        if [ -d "node_modules" ]; then
            echo -e "  ${RED}Removing node_modules${NC}"
            rm -rf node_modules
        fi
        
        # Remove package-lock.json (optional, uncomment if needed)
        # if [ -f "package-lock.json" ]; then
        #     echo -e "  ${RED}Removing package-lock.json${NC}"
        #     rm package-lock.json
        # fi
        
        echo -e "  ${GREEN}✓ ${project_name} cleaned${NC}\n"
        cd - > /dev/null || exit
    else
        echo -e "  ${RED}✗ Directory not found: ${project_path}${NC}\n"
    fi
}

# Get the script's directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Clean both projects
clean_directory "$SCRIPT_DIR/dogsitting_frontend" "dogsitting_frontend"
clean_directory "$SCRIPT_DIR/core_frontend" "core_frontend"
clean_directory "$SCRIPT_DIR/" "root project"

echo -e "${GREEN}Cleanup complete!${NC}"
echo -e "${YELLOW}Run 'npm install' in each project to reinstall dependencies.${NC}"