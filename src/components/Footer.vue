<template>
    <div class="footer">
        <Dropdown trigger="click" class="dropdown-menu-range">
            <div class="select-title">过去7天<Icon type="ios-arrow-down"></Icon></div>
            <DropdownMenu slot="list">
                <DropdownItem>今日</DropdownItem>
                <DropdownItem>过去7天</DropdownItem>
                <DropdownItem>过去30天</DropdownItem>
                <DropdownItem>自定义</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="scss">
    .footer {
        height: 48px;
        border-top: 1px solid #e8e8e8;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .dropdown-menu-range {
            font-size: 14px;
            color: #737373;

            .select-title {
                margin: 15px 25px;
            }
        }

    }
</style>
