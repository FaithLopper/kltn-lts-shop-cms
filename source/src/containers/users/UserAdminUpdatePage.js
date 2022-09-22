
import React, { Component } from 'react';
import PageWrapper from '../../compoments/common/PageWrapper';
// import ECatalogueLevel1Tab from './ECatalogueLevel1Tab';
// import ECatalogueBannersTab from './ECatalogueBannersTab'
// import { siteConfig } from '../../constants/siteConfig';
import { sitePathConfig } from '../../constants/sitePathConfig';
import UserAminLevel1Tab from './UserAminLevel1Tab';

class UserAdminUpdatePage extends Component {

    constructor(props) {
        super(props);
        const isCreating = props.match.params.id === 'create';
        this.GENERAL_TAB = sitePathConfig.adminUpdate.path;
        // this.BANNERS_TAB = sitePathConfig.eCatalogueBannerList.path;
        this.tabs = [
            {
                key: this.GENERAL_TAB,
                tab: 'General'
            }
        ];
        if (!isCreating) {
            this.tabs.push(
                {
                    key: this.BANNERS_TAB,
                    tab: 'Banner level 2'
                },
            );
        }
        this.state = {
            activeTab: this.GENERAL_TAB,
            titlePage: isCreating ? 'Create' : '',
        }

    }

    onChangeTab = (tabKey) => {
        this.props.history.push(tabKey.replace(':id', this.props.match.params.id));
    }

    onChangeTitlePage = titlePage => {
        this.setState({ titlePage });
    }

    render() {
        const activeTab = this.props.match.path;

        const { titlePage } = this.state;
        return (
            <PageWrapper
                routes={[
                    { breadcrumbName: 'Trang chủ' },
                    { breadcrumbName: 'Quản trị viên', path: sitePathConfig.admin.path },
                    { breadcrumbName: titlePage }
                ]}
                title={titlePage}
                onChangeTab={this.onChangeTab}
                activeTab={activeTab}
            >
               
                    <UserAminLevel1Tab
                        onChangeTitlePage={this.onChangeTitlePage}
                        {...this.props}
                    />
                
            </PageWrapper>
        )
    }
}

export default UserAdminUpdatePage;
